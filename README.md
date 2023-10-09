# electron-workspace
electron pnpm workspace
参考：
https://juejin.cn/post/7240793907633782845?searchId=202310081035527814B860175131EADA81
https://hongbusi.com/posts/best-practices-for-monorepos/

创建项目目录monorepo
pnpm init 创建package.json
创建pnpm-workspace.yaml
packages:
  - packages/*
创建packages根目录，其下创建两个项目目录web、client
分别在web、client下pnpm init

安装依赖
# 全局安装 -w: --workspace-root
pnpm add typescript -D -w
pnpm add electron -wD

# 局部安装
pnpm add vite @vitejs/plugin-vue -D --filter web
$ pnpm add vue --filter web

# 互相安装
pnpm add web -D --workspace --filter client
