/**
 * Created by fyh13 on 16/10/19.
 */
const Bull = require('bull');
const request = require('request');
const parseString = require('xml2js').parseString;

const config = require('../../config');
const Log = require('../log');

const sendMsgUrlShopNFri = config.msgConfig.yimeiConfig.sendMsgUrlShopNFri;
const sendVoiceMsgUrlShopNFri = config.msgConfig.yimeiConfig.sendVoiceMsgUrlShopNFri;
const cdkeyShopNFri = config.msgConfig.yimeiConfig.cdkeyShopNFri;
const sessionKeyShopNFri = config.msgConfig.yimeiConfig.sessionKeyShopNFri;

const sendMsgUrlInternational = config.msgConfig.yimeiConfig.sendMsgUrlInternational;
const cdkeyInternational = config.msgConfig.yimeiConfig.cdkeyInternational;
const sessionKeyInternational = config.msgConfig.yimeiConfig.sessionKeyInternational;



function Queue(){}

/**
 * 创建任务队列
 * @param  {String}   queueName 队列名称
 * @param  {Function} process   任务执行时的回调
 * @return {Bull}              队列
 */
function _createQueue(queueName, process) {
  const opt = {
    redis:{
      port: config.redis.port,
      host: config.redis.host,
      DB: config.redisDB.db3
    }
  };
  const _queue = Bull(queueName, opt);
  
  _queue
    .on('error', function (error) {
      console.error(queueName + "Bull Error:", error);
    })
    .on('failed', function (job, err) {
      console.log(queueName + "job failed", job.data, 'error:', err);
      job.retry();
    })
    .on('cleaned', function (job, type) {
      console.log(queueName + 'Cleaned %s %s jobs', job.length, type);
    })
    .on('completed', function (job, result) {
      console.log(queueName + ":", job.jobId, "completed! result is :", result);
      job.remove();
    });
  
  _queue.process(process);
  
  _queue.clean(100, 'failed');
  _queue.clean(100);
  
  return _queue;
}


Queue.prototype.createFriTaskQueue = ()=> {
  //发送SMS短信任务队列
  let sendShopNFriSMSQueue = _createQueue('SEND_SNF_SMS_QUEUE_YIMEI', sendMsgFriFunYiMei);
  return sendShopNFriSMSQueue;
  
  function sendMsgFriFunYiMei(job, done) {
    
    console.log('SEND_SNF_SMS_QUEUE_YIMEI jobId:', job.jobId);
    console.log('SEND_SNF_SMS_QUEUE_YIMEI job data', job.data);
    
    var msg, cdkey, password, phone, seqid, smspriority, url;
    if (job.data.countryCode === '+86') {
      msg = "您此次的觅友购验证码为：" + job.data.authCode + "（30分钟内有效）";
      cdkey = cdkeyShopNFri;
      password = sessionKeyShopNFri;
      phone = job.data.cellphoneNum;
      smspriority = 1;
      url = sendMsgUrlShopNFri;
    } else {
    	msg = "The Shopnfriends auth code for you is:" + job.data.authCode + "(valid for 30 minutes)" + "[Shopnfriends]";
    	cdkey = cdkeyInternational;
    	password = sessionKeyInternational;
    	var fullNumber = job.data.fullNumber || (job.data.countryCode + '' + job.data.cellphoneNum);
    	var phoneNum = fullNumber.split('+')[1];
    	phone = "00" + phoneNum;
    	smspriority = 1;
    	url = sendMsgUrlInternational;
    }
    
    console.log("...............................................................");
    var r = request.post(url, function (err, httpResponse, body) {
      if (err) {
        console.log('post failed:', err);
        sendShopNFriSMSQueue.add(job.data);
      } else {
        console.log('post successful!  Server responded with:', body);
        parseString(body, function (err, result) {
          console.log("SEND_SNF_QUEUE_YIMEI_PARSE", {
            status: "SEND_SNF_SMS_QUEUE_YIMEI_PARSE",
            fullNumber: job.data.fullNumber,
            countryCode: job.data.countryCode,
            cellphoneNum: job.data.cellphoneNum,
            phone: phone,
            err: err,
            errCode: result.response.error,
            message: result.response.message
          });
          
          
          if (err){
            console.log('err====>', err)
          } else {
            console.log('result====>', JSON.stringify(result, null, 2))
          }
        });
      }
    });
    var form = r.form();
    
    form.append('cdkey', cdkey);
    form.append('password', password);
    form.append('phone', phone);
    form.append('message', msg);
    form.append('smspriority', 1);
    form.append('seqid', Date.now());
    
    done();
  }
};

module.exports = new Queue();