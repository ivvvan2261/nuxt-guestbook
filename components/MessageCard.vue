<template>
  <UCard class="shadow-md hover:shadow-lg transition-shadow">
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
        v-if="canDelete"
        color="red"
        variant="ghost"
        size="sm"
        icon="i-heroicons-trash"
        @click="handleDelete"
      />
    </div>
    <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
      {{ message.message }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
import type { Message } from '~/types/message';
import { formatDate } from '~/utils/date';

interface Props {
  message: Message;
  canDelete?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  canDelete: false,
});

const emit = defineEmits<{
  delete: [id: string];
}>();

const handleDelete = () => {
  if (confirm('确定要删除这条留言吗？')) {
    emit('delete', props.message.id);
  }
};
</script>

