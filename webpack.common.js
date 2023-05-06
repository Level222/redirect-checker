const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    offscreen: "./src/offscreen/index.js",
    background: "./src/background/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/offscreen/offscreen.html",
      filename: "offscreen.html",
      chunks: ["offscreen"]
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json"
        },
        {
          from: "./src/icons",
          to: "icons"
        }
      ]
    })
  ]
};
