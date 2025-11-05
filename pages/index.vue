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
      <MessageForm class="mb-8" @submit="handleSubmit" />

      <!-- 留言列表 -->
      <MessageList
        :messages="messages"
        :pending="pending"
        :error="error"
        :can-delete="canDelete"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageInsert } from '~/types/message';
import { useMessages } from '~/composables/useMessages';

const { messages, pending, error, submitMessage, deleteMessage, canDelete } = useMessages();

const handleSubmit = async (formData: MessageInsert) => {
  await submitMessage(formData);
};

const handleDelete = async (id: string) => {
  await deleteMessage(id);
};
</script>
