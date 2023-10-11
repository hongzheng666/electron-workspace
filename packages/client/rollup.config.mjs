import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from '@babel/core';
import alias from "@rollup/plugin-alias";
import strip from "@rollup/plugin-strip";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// import del from 'rollup-plugin-delete';

// import pkg from "./package.json" assert { type: "json" }; //断言导出json模块

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// rimrafSync("dist");// 删除打包目录

export default defineConfig([
  {
    input: "src/index.ts", //入口文件
    output: [
        {
          dir: 'dist', //出口文件夹
          format: "cjs", //打包成CommonJS模块
        },
    ],
    plugins: [
        json(),         // 将 .json 文件转换为 ES6 模块
        terser(),       // 压缩es包
        nodeResolve(),  // Use the Node resolution algorithm.
        commonjs(),  // Convert CommonJS modules to ES Modules.
        alias({
            entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
        }),
        typescript(),  // 注意在babel前
        babel({
          babelHelpers: 'runtime',
          presets: ["@babel/preset-env"],  // 将ES6转换为向后兼容的JavaScript
          plugins: [["@babel/plugin-transform-runtime", { useESModules: true }]],  // 处理async，await、import()等语法关键字的帮助函数
          extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"], //增加配置
        }),
        // del({ targets: "dist/*" }),
        strip(),  // 清除调试代码console.log
    ],
    // 指出应将哪些模块视为外部模块, 现在将被视为外部的,不会与你的库打包在一起
    external: [
      'electron',
    ]
  },
]);
