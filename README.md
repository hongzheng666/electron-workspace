# electron-workspace
关键字：electron pnpm workspace ts
# 项目介绍
  packages下有两个项目，client为electron客户端项目，客户端嵌套了web项目（vue3）  

[gitee上有每次变动的分支时间，展示了项目开发过程](https://gitee.com/TuDi/electron-workspace)  

#运行项目
```javascript
pnpm install
pnpm dev
```

#打包
```javascript
pnpm package
```

pnpm workspace rollup参考：  
  - https://juejin.cn/post/7098609682519949325  
  - https://juejin.cn/post/7240793907633782845?searchId=202310081035527814B860175131EADA81  
  - https://hongbusi.com/posts/best-practices-for-monorepos/ 

[rollup参考](https://juejin.cn/post/7267167108609310783#heading-19)

# 创建项目目录结构

* 创建项目目录monorepo
* pnpm init 创建package.json
* 创建pnpm-workspace.yaml

```javascript
packages:
  - packages/*
```

创建packages根目录，  
其下创建两个项目目录web、client  
分别在web、client下pnpm init  

# 安装依赖
1. 全局安装 -w: --workspace-root
  - pnpm add typescript -D -w

  - pnpm add electron -wD

2. 局部安装
  - pnpm add vite @vitejs/plugin-vue -D --filter web

  - pnpm add vue --filter web

3. 互相安装(client项目依赖web项目, 此处没有这种依赖，只是举个例子，不要执行以下命令)
  - pnpm add web -D --workspace --filter client
