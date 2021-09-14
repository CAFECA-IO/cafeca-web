const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const frontend = {
  mode: "development",
  entry: path.resolve(__dirname, "src/frontend/index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "javascript/index.js",
    chunkFilename: "[id].js",
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
    contentBase: path.join(__dirname, "public/"),
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "image/[name].[ext]", // 修改生成路徑
              esModule: false,
              publicPath: "../",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/frontend/resources", to: "resources" },
        { from: "src/frontend/index.html", to: "." },
        { from: "src/frontend/manifest.json", to: "." }
      ],
    }),
  ],
};

module.exports = [frontend];