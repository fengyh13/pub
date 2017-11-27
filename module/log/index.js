'use strict';

const bunyan = require('bunyan');
const config = require('../../config');
const pathTool = require('path');
const fs = require('fs');

function Log() {
  createDir();
}

//递归创建dir function
function mkdirsSync(dirname){
  if(!dirname){
    return ;
  }
  if(fs.existsSync(dirname)){
    return true;
  }else{
    if(mkdirsSync(pathTool.dirname(dirname))){
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

//创建Dir
function createDir(){
  Object.keys(config.logConfig).forEach(function(item){
    mkdirsSync(config.logConfig[item].path);
  })
}


function commonSerizlizer(item) {
  return item;
}

function constructor(key, obj) {
  var path = (typeof obj === 'string') ? obj : obj.path;
  var productionLog = (typeof obj === 'string') ? false : obj.isOpenLogSystem;
  var level = (typeof obj === 'string') ? 'info' : obj.level;
  var loggerName = key + '_logger';
  
  var loggerConfig = {
    name: global.projectName,
    serializers: {
      type: commonSerizlizer,
      status: commonSerizlizer
    }
  };
  
  let streamConfig = {};
  
  if (path) {
    streamConfig.path = pathTool.join(path , "snf.log");
  } else {
    streamConfig.stream = process.stdout
  }
  if (level) {
    streamConfig.level = level;
  }
  
  if (Object.keys(streamConfig).length) {
    loggerConfig.streams = [streamConfig];
  }
  
  return function(command, status, ctx) {
    
    if (!this[loggerName]) {
      this[loggerName] = bunyan.createLogger(loggerConfig);
    }
    
    var logFn = this[loggerName][level];
    
    if (typeof logFn !== 'function' || (!productionLog)) {
      return;
    }
    
    logFn.call(this[loggerName], { type: command, status: status }, ctx);
  };
}

Object.keys(config.logConfig).forEach(function (key) {
  let log = config.logConfig[key];
  Log.prototype[log.fnName || key] = constructor(key, log);
});

module.exports = new Log();