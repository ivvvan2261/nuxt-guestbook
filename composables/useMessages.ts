import type { Message, MessageInsert } from '~/types/message';
import type { Database } from '~/types/database.types';

/**
 * 留言相关的数据操作 composable
 */
export const useMessages = () => {
  const supabase = useSupabaseClient<Database>();

  // 获取留言列表
  const {
    data: messages,
    pending,
    error,
    refresh,
  } = useLazyAsyncData<Message[]>('messages', async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  });

  // 提交留言
  const submitMessage = async (messageData: MessageInsert) => {
    const toast = useToast();

    try {
      const { error } = await supabase.from('messages').insert([messageData]);

      if (error) throw error;

      await refresh();

      toast.add({
        title: '发表成功',
        description: '您的留言已成功发表',
        color: 'green',
      });

      return { success: true };
    } catch (err: any) {
      toast.add({
        title: '发表失败',
        description: err.message || '请稍后重试',
        color: 'red',
      });

      return { success: false, error: err };
    }
  };

  // 删除留言
  const deleteMessage = async (id: string) => {
    const toast = useToast();

    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);

      if (error) throw error;

      await refresh();

      toast.add({
        title: '删除成功',
        description: '留言已删除',
        color: 'green',
      });

      return { success: true };
    } catch (err: any) {
      toast.add({
        title: '删除失败',
        description: err.message || '请稍后重试',
        color: 'red',
      });

      return { success: false, error: err };
    }
  };

  // 检查是否可以删除（可根据权限逻辑扩展）
  const canDelete = (message: Message) => {
    const user = useSupabaseUser();
    // 这里可以根据需要添加权限检查逻辑
    // 例如：return user.value?.id === message.user_id;
    return true;
  };

  return {
    messages,
    pending,
    error,
    refresh,
    submitMessage,
    deleteMessage,
    canDelete,
  };
};

