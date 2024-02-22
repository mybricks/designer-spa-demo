import React from "react";
import { render } from "react-dom";

import App from "./app";

const dom = document.getElementById("root");

if (dom) {
  render(<App />, dom);
} else {
  throw new Error("缺少ID为root的dom节点");
}
