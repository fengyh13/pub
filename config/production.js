/**
 * Created by liutao on 16/12/14.
 */

const path = require("path");
const config = require("./commonConfig");

module.exports = {
  
  /**
   * ===========================
   *  MYSQL连接
   * ===========================
   */
  mysqlConnect: {
    dataBase: "",
    account: "",
    password: "",
    host: "",
    port: "",
    dialect: "",
    logging: false
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
      path: path.join(config.logPath, '/info'),
      level: 'info',
      isOpenLogSystem: true
    },
    error: {
      path: path.join(config.logPath, '/error'),
      level: 'error',
      isOpenLogSystem: true
    },
    speed: {
      path: path.join(config.logPath, '/speed'),
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
    host: "",
    port: ""
  },
  
  /**
   * ===========================
   *  易极付环境配置
   * ===========================
   */
  yiJiPayConfig: {
    env: "Release",
    payReturnUrl : "",
    snfSellerId : "",
    fastMoneyRefundUrl : ""
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