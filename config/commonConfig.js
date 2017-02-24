/**
 * Created by liutao on 16/12/14.
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  
  /**
   * ===========================
   * 日志路径
   * ===========================
   */
  logPath: path.join('/opt/projectSNF/logs/', global.projectName),
  
  /**
   * ===========================
   * 阿里云旺配置
   * ===========================
   */
  yunWangUserInfo: {
  },
  
  /**
   * ===========================
   *  redis DB配置
   * ===========================
   */
  redisDB: {
    db0: 0,
    db1: 1, //存放用户token信息
    db2: 2, //存放商品设置的定时
    db3: 3 //存放短信任务队列
  },
  
  /**
   * ===========================
   *  消息配置
   * ===========================
   */
  msgConfig: {
    yimeiConfig: {
    }
  }
  
};