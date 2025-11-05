<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-4xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">留言板</h1>
        <p class="text-gray-600 dark:text-gray-400">留下你的想法和祝福</p>
      </div>

      <!-- 添加留言表单 -->
      <UCard class="mb-8 shadow-lg">
        <template #header>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">发表留言</h2>
        </template>

        <form @submit.prevent="submitMessage" class="space-y-4">
          <UFormGroup label="姓名" name="name" required>
            <UInput v-model="form.name" placeholder="请输入您的姓名" size="lg" :disabled="loading" />
          </UFormGroup>

          <UFormGroup label="留言内容" name="message" required>
            <UTextarea v-model="form.message" placeholder="请输入留言内容..." :rows="4" size="lg" :disabled="loading" />
          </UFormGroup>

          <div class="flex justify-end">
            <UButton type="submit" color="primary" size="lg" :loading="loading" :disabled="!form.name || !form.message">
              发表留言
            </UButton>
          </div>
        </form>
      </UCard>

      <!-- 留言列表 -->
      <div class="space-y-4">
        <div v-if="pending" class="text-center py-8">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin mx-auto text-gray-400" />
          <p class="mt-2 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>

        <div v-else-if="error" class="text-center py-8">
          <UAlert color="red" variant="soft" title="加载失败" :description="error.message" />
        </div>

        <div v-else-if="messages && messages.length === 0" class="text-center py-12">
          <UIcon
            name="i-heroicons-chat-bubble-left-right"
            class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          />
          <p class="text-gray-500 dark:text-gray-400">还没有留言，快来发表第一条吧！</p>
        </div>

        <div v-else class="space-y-4">
          <UCard v-for="message in messages" :key="message.id" class="shadow-md hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ message.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(message.created_at) }}
                </p>
              </div>
              <UButton
                v-if="canDelete(message)"
                color="red"
                variant="ghost"
                size="sm"
                icon="i-heroicons-trash"
                @click="deleteMessage(message.id)"
              />
            </div>
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {{ message.message }}
            </p>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 表单数据
const form = ref({
  name: '',
  message: '',
});

const loading = ref(false);
const supabase = useSupabaseClient();

// 获取留言列表
const {
  data: messages,
  pending,
  error,
  refresh,
} = await useLazyAsyncData('messages', async () => {
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });

  if (error) throw error;
  return data;
});

// 提交留言
const submitMessage = async () => {
  if (!form.value.name || !form.value.message) return;

  loading.value = true;
  try {
    const { error } = await supabase.from('messages').insert([
      {
        name: form.value.name.trim(),
        message: form.value.message.trim(),
      },
    ]);

    if (error) throw error;

    // 清空表单
    form.value.name = '';
    form.value.message = '';

    // 刷新列表
    await refresh();

    // 显示成功提示
    const toast = useToast();
    toast.add({
      title: '发表成功',
      description: '您的留言已成功发表',
      color: 'green',
    });
  } catch (err: any) {
    const toast = useToast();
    toast.add({
      title: '发表失败',
      description: err.message || '请稍后重试',
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
};

// 删除留言
const deleteMessage = async (id: string) => {
  if (!confirm('确定要删除这条留言吗？')) return;

  try {
    const { error } = await supabase.from('messages').delete().eq('id', id);

    if (error) throw error;

    await refresh();

    const toast = useToast();
    toast.add({
      title: '删除成功',
      description: '留言已删除',
      color: 'green',
    });
  } catch (err: any) {
    const toast = useToast();
    toast.add({
      title: '删除失败',
      description: err.message || '请稍后重试',
      color: 'red',
    });
  }
};

// 格式化日期
const formatDate = (date: string) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;

  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 检查是否可以删除（当前用户创建的留言）
const canDelete = (message: any) => {
  const user = useSupabaseUser();
  // 这里可以根据需要添加权限检查逻辑
  // 暂时允许所有人删除（或可以添加用户ID关联）
  return true;
};
</script>
