const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
      index : ["./src/index.ts", "./src/config/configuration.ts", "./src/model/ball-state.ts", "./src/model/velocity.ts"],
      bounce : "./src/worker/bounce-worker.ts"
  },
  output: {
    filename: "[name].js"
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
