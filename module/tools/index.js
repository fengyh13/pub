module.exports = new Tools();

function Tools(){}

/**
 * 获取随机字符串
 * @param len 长度
 * @param type 类型 1数字＋文字  2数字
 * @returns {string}
 */
Tools.prototype.getRandomString = (len, type)=>{
  len = len || 32;
  if (type != 1 && type != 2) {
    type = 1;
  }
  var $chars;
  if (type == 1) {
    $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  } else if (type == 2) {
    $chars = '0123456789';     //只取数字
  }
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {Number}
 */
Tools.prototype.getRandomIntegerNum = (min, max)=>{
  return parseInt(Math.random()*(max - min + 1) + min);   //(min, max)
};

/**
 * ip地址转换
 * @param ip
 * @returns {number}
 * @private
 */
Tools.prototype._ip2int = (ip) => {
  let num = 0;
  ip = ip.split(".");
  num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
  num = num >>> 0;
  return num;
};

/**
 * 获取当前时间 (10位时间戳)
 * @param GMT
 * @returns {Number}
 */
Tools.prototype.getNowTime = (GMT) => {
  
  if(!GMT){
    GMT = 0;
  }
  
  return parseInt((new Date().getTime() + (parseInt(GMT) * 60 * 60 * 1000))/1000);
  
};

/**
 * function name : 设置三部分的定时
 */
Tools.prototype.setThreePartExpireKey = (key1 , key2, type) => {
  
  return key1 + "&" + key2 + "&" + type
  
};

/**
 * function name : 设置三部分的定时
 * type : setVirtualStockDelTiming key1:商品id  key2: 累计减少的虚拟库存数量  key3: 剩余时间
 */
Tools.prototype.setFourPartExpireKey = (key1 , key2, key3, type) => {
  
  return key1 + "&" + key2 + "&" + key3 + "&" + type
  
};

/**
 * 数组去重
 * @param array
 * @returns {Array}
 */
Tools.prototype.arrayUnique = (array) => {
  var res = [];
  var json = {};
  for(var i = 0; i < array.length; i++){
    if(!json[array[i]]){
      res.push(array[i]);
      json[array[i]] = 1;
    }
  }
  return res;
};

/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

/**
 * 当前日期往后添加天数
 * @param days
 * @returns {Date}
 */
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
};

module.exports = new Tools();