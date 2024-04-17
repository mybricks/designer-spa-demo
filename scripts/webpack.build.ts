import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import { Configuration as DevConfiguration } from "webpack-dev-server";

import baseConfig from "./webpack.base";

const config: Configuration & DevConfiguration = merge(baseConfig, {
  mode: "production",
});

export default config;
