/**
 * Created by liutao on 16/12/14.
 */

// process.env.NODE_ENV = "localhost";
// process.env.NODE_ENV = "development";
// process.env.NODE_ENV = "production";
const env = process.env.NODE_ENV;
const specialConfig = require('./' + env);
const commonConfig = require('./commonConfig');

module.exports = Object.assign({}, commonConfig, specialConfig);