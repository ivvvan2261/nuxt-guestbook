import type { MessageInsert } from '~/types/message';

/**
 * 留言表单相关的 composable
 */
export const useMessageForm = () => {
  const form = ref<{
    name: string;
    message: string;
  }>({
    name: '',
    message: '',
  });

  const loading = ref(false);

  const isValid = computed(() => {
    return form.value.name.trim() && form.value.message.trim();
  });

  const reset = () => {
    form.value.name = '';
    form.value.message = '';
  };

  const getFormData = (): MessageInsert => {
    return {
      name: form.value.name.trim(),
      message: form.value.message.trim(),
    };
  };

  return {
    form,
    loading,
    isValid,
    reset,
    getFormData,
  };
};

