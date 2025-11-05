<template>
  <UCard class="shadow-lg">
    <template #header>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">发表留言</h2>
    </template>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <UFormGroup label="姓名" name="name" required>
        <UInput
          v-model="form.name"
          placeholder="请输入您的姓名"
          size="lg"
          :disabled="loading"
        />
      </UFormGroup>

      <UFormGroup label="留言内容" name="message" required>
        <UTextarea
          v-model="form.message"
          placeholder="请输入留言内容..."
          :rows="4"
          size="lg"
          :disabled="loading"
        />
      </UFormGroup>

      <div class="flex justify-end">
        <UButton
          type="submit"
          color="primary"
          size="lg"
          :loading="loading"
          :disabled="!isValid"
        >
          发表留言
        </UButton>
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
const { form, loading, isValid, reset, getFormData } = useMessageForm();

const emit = defineEmits<{
  submit: [data: ReturnType<typeof getFormData>];
}>();

const handleSubmit = async () => {
  if (!isValid.value) return;

  loading.value = true;
  try {
    const formData = getFormData();
    emit('submit', formData);
    reset();
  } finally {
    loading.value = false;
  }
};
</script>

