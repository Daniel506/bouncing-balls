const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "My Awesome application",
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    extensions: [".ts"]
  }
};
