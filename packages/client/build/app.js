const { join } = require("path");
module.exports = {
    dir: join(__dirname, "../dist"), // 源文件的目录
    out: join(__dirname, "../out"), // 打包目录
    name: "client", // 应用名
    overwrite: true, // 是否覆盖
    appCopyright: "Copyright © 2023 sci版权所有"
    // icon： 应用图标
};
