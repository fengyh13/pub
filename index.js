/**
 * Created by liutao on 16/12/14.
 */

global.Promise = require('bluebird');
const path = require("path");
const fs = require("fs");
const dirPath = path.join(__dirname, "/module");
const modelsDir = fs.readdirSync(dirPath);

function Manage(opts) {
  
  this._opts = opts || modelsDir;
  
  var that = {};
  
  if (this._opts instanceof Array === false) {
    throw new Error('param is Error');
  }
  
  if (this._opts.length === 0) {
    this._opts = modelsDir;
  }
  
  this._opts.forEach(function(fileName) {
    if (modelsDir.indexOf(fileName) != -1) {
      that[fileName] = require(path.join(dirPath, "/", fileName));
    } else {
      throw new Error(fileName + " module is not exists");
    }
  });
  
  return that;
}

module.exports = Manage;