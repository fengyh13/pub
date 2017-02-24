/**
 * Created by liutao on 16/12/14.
 */

/**
 * Created by liutao on 16/12/14.
 */
const path = require('path');

module.exports = {
  
  /**
   * ===========================
   *  MYSQL连接
   * ===========================
   */
  mysqlConnect: {
    dataBase: "test",
    account: "root",
    password: "",
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
    logging: console.log
  },
  
  /**
   * ===========================
   *  日志配置
   * ===========================
   */
  logConfig: {
    debug: {
      level: 'debug',
      isOpenLogSystem: true //是否显示输出  是否记录日志
    },
    info: {
      path: path.join('/Users/liutao/Desktop/snfLog/', '/info'),
      level: 'info',
      isOpenLogSystem: true
    },
    error: {
      path: path.join('/Users/liutao/Desktop/snfLog/', '/error'),
      level: 'error',
      isOpenLogSystem: true
    },
    speed: {
      path: path.join('/Users/liutao/Desktop/snfLog/', '/speed'),
      level: 'info',
      isOpenLogSystem: true
    }
  },
  
  /**
   * ===========================
   *  redis连接配置
   * ===========================
   */
  redis: {
    host: "127.0.0.1",
    port: "6379"
  },
  
  /**
   * ===========================
   *  易极付环境配置
   * ===========================
   */
  yiJiPayConfig: {
    env: "Debug",
    payReturnUrl : "",
    snfSellerId : ""
  },
  
  /**
   * ===========================
   *  阿里百川IM配置
   * ===========================
   */
  baiChuanIMConfig: {
    appkey: '',
    appsecret: '',
    REST_URL: ''
  }
};