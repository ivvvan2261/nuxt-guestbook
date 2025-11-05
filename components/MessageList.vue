<template>
  <div class="space-y-4">
    <!-- 加载状态 -->
    <div v-if="pending" class="text-center py-8">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin mx-auto text-gray-400" />
      <p class="mt-2 text-gray-600 dark:text-gray-400">加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="text-center py-8">
      <UAlert color="red" variant="soft" title="加载失败" :description="error.message" />
    </div>

    <!-- 空状态 -->
    <div v-else-if="!messages || messages.length === 0" class="text-center py-12">
      <UIcon
        name="i-heroicons-chat-bubble-left-right"
        class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
      />
      <p class="text-gray-500 dark:text-gray-400">还没有留言，快来发表第一条吧！</p>
    </div>

    <!-- 留言列表 -->
    <div v-else class="space-y-4">
      <MessageCard
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :can-delete="canDelete(message)"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/message';

interface Props {
  messages: Message[] | null;
  pending: boolean;
  error: Error | null;
  canDelete?: (message: Message) => boolean;
}

const props = withDefaults(defineProps<Props>(), {
  canDelete: () => true,
});

const emit = defineEmits<{
  delete: [id: string];
}>();

const handleDelete = (id: string) => {
  emit('delete', id);
};
</script>

