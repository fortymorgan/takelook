const router = require('./router');
const routes = require('./routes');

module.exports.render = () => {
  router(routes);
};
