import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  entry: {
    ["index"]: path.resolve(__dirname, "../src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name]-[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  externals: [
    {
      react: "React",
      "react-dom": "ReactDOM",
    },
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.less?$/,
        use: [
          {
            loader: "style-loader",
            options: {
              attributes: {
                title: "less",
              },
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]-[hash:5]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      template: path.resolve(__dirname, "../templates/index.ejs"),
    }),
  ],
};

export default config;
