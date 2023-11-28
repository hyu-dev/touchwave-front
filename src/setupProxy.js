const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    process.env.SERVER_PROXY_PARAMETER,
    createProxyMiddleware({
      target: process.env.SERVER_PATH,
      changeOrigin: true,
    })
  );
};
