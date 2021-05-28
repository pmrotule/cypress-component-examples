const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("@vue/cli-service/webpack.config");
const RewiremockWebpackPlugin = require("rewiremock/webpack/plugin");

function setUpRewiremock(webpackConfig) {
  webpackConfig.optimization = webpackConfig.optimization || {};
  webpackConfig.optimization.namedModules = true;

  webpackConfig.plugins = webpackConfig.plugins || [];
  webpackConfig.plugins.push(new RewiremockWebpackPlugin());
}

module.exports = (on, config) => {
  on("dev-server:start", (options) => {
    setUpRewiremock(webpackConfig);
    const modifiedWebpackConfig = {
      ...webpackConfig,
      plugins: (webpackConfig.plugins || []).filter((x) => {
        return x.constructor.name !== "HtmlPwaPlugin";
      }),
    };

    return startDevServer({
      options,
      webpackConfig: modifiedWebpackConfig,
    });
  });

  return config;
};
