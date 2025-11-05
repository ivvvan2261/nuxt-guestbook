# Nuxt 留言板

基于 Nuxt UI 和 Supabase 构建的留言板应用。

## 功能特性

- ✨ 简洁美观的界面设计
- 💬 留言发布和查看
- 🗑️ 留言删除功能
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- ⚡ 基于 Nuxt 3 和 Supabase，性能优异

## 技术栈

- [Nuxt 3](https://nuxt.com/)
- [Nuxt UI](https://ui.nuxt.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

1. 在 [Supabase](https://supabase.com/) 创建新项目
2. 在 Supabase Dashboard 中，进入 **SQL Editor**
3. 复制 `database/supabase-setup.sql` 文件的内容，或直接执行该文件中的 SQL 语句
4. 这将创建 `messages` 表并设置必要的权限策略
5. 复制 Supabase 项目的 URL 和 Anon Key：
   - 进入 **Settings** > **API**
   - 复制 **Project URL**
   - 复制 **anon public** key
6. （可选）生成数据库类型文件：
   - 安装 Supabase CLI：`npm install -g supabase`
   - 运行：`supabase gen types typescript --project-id your-project-id > types/database.types.ts`
   - 这将生成完整的数据库类型定义，提供更好的类型安全

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并填入你的 Supabase 配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Supabase 配置：

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 部署到 Vercel

### 方法一：通过 Vercel Dashboard

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel](https://vercel.com/) 导入项目
3. 添加环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. 点击 Deploy

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

- `SUPABASE_URL`: 你的 Supabase 项目 URL
- `SUPABASE_KEY`: 你的 Supabase Anon Key

## 项目结构

```
.
├── assets/          # 静态资源
├── pages/           # 页面文件
├── app.vue          # 根组件
├── nuxt.config.ts   # Nuxt 配置
├── vercel.json      # Vercel 部署配置
└── package.json     # 项目依赖
```

## 开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 许可证

MIT
