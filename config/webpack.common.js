const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new FaviconsWebpackPlugin({
      logo: "public/echocrew.png",
      manifest: "public/manifest.json",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@routers": path.resolve(__dirname, "../src/routers"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@utils": path.resolve(__dirname, "../src/utils"),
    },
  },
};
