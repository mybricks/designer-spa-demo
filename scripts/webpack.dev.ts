import path from "path";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration as DevConfiguration } from "webpack-dev-server";

import baseConfig from "./webpack.base";

const config: Configuration & DevConfiguration = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    static: path.resolve(__dirname, "../templates"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      template: path.resolve(__dirname, "../templates/index.ejs"),
    }),
  ],
});

export default config;
