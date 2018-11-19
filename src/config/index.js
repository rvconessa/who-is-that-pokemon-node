const { defaultsDeep } = require('lodash');
const environment = process.env.NODE_ENV || 'development';

module.exports = defaultsDeep(
    require(`./config.${environment}`),
);
  