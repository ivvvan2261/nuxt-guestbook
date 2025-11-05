-- Supabase 数据库初始化脚本
-- 在 Supabase Dashboard > SQL Editor 中执行此脚本

-- 创建 messages 表
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 启用 Row Level Security (RLS)
alter table messages enable row level security;

-- 删除已存在的策略（如果存在）
drop policy if exists "任何人都可以查看留言" on messages;
drop policy if exists "任何人都可以发表留言" on messages;
drop policy if exists "任何人都可以删除留言" on messages;

-- 允许所有人查看留言
create policy "任何人都可以查看留言"
  on messages for select
  using (true);

-- 允许所有人发表留言
create policy "任何人都可以发表留言"
  on messages for insert
  with check (true);

-- 允许所有人删除留言（可根据需要修改权限）
create policy "任何人都可以删除留言"
  on messages for delete
  using (true);

-- 创建索引以提高查询性能
create index if not exists messages_created_at_idx on messages(created_at desc);

