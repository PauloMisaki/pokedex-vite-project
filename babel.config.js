const presets = [
  ["@babel/preset-env", { "targets": { "esmodules": true } }],
  ["@babel/preset-react", { "runtime": "automatic" }]];
const plugins = [];

module.exports = { presets, plugins };