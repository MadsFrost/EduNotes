const { default: WebpackPlugin } = require('@electron-forge/plugin-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = [new ForkTsCheckerWebpackPlugin(), new NodePolyfillPlugin()];
