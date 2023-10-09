const { resolve } = require("path");
const fs = require("fs");
const app = require("./app");

const json = require('../package.json');
json.main = "./index.js";
json.name = app.name;
delete json.devDependencies;
delete json.scripts;
fs.writeFileSync(resolve(__dirname, "../dist/package.json"), JSON.stringify(json), "utf-8");

