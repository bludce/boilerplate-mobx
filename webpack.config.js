/* eslint-disable */
module.exports = function (env) {
  return require(`./webpack/webpack.config.${env.buildType}.js`)(env.type, env.path);
};