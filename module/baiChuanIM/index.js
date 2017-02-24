/**
 * Created by fyh13 on 16/10/25.
 */
const Config = require("../../config");
let TopClient = require('topSdk').ApiClient;

let client = new TopClient({
	'appkey': Config.baiChuanIMConfig.appkey,
	'appsecret': Config.baiChuanIMConfig.appsecret,
	'REST_URL': Config.baiChuanIMConfig.REST_URL
});

function IM(){}

IM.prototype._buildError = function(error, userInfo){
	return {
		error: error,
		info: userInfo
	}
};
IM.prototype._executeCommand = function(command, params){
	const that = this;
	return new Promise((resolve, reject) => {
		let userInfo = client.execute(command, params, function(error, response) {
			if (!error) {
				resolve(response);
			} else {
				reject(that._buildError(error, response));
			}
		})
	})
};

//添加用户
IM.prototype.addUser = function(params){
	let paramTmp = {
		userinfos: JSON.stringify(params)
	};

	return this._executeCommand('taobao.openim.users.add', paramTmp);
};

//获取用户信息
IM.prototype.getUser = function(params){
	let paramTmp = {
		userids: params.userids
	};
	//if (params)
	return this._executeCommand('taobao.openim.users.get', paramTmp);
};

//更新用户信息
IM.prototype.updateInfo = function(params){
	let paramTmp = {
			userinfos: JSON.stringify(params)
		};

	//if (params)
	return this._executeCommand('taobao.openim.users.update', paramTmp);
};

//发送标准消息
IM.prototype.sendStandardMsg = function(params){
	let paramTmp = {
		immsg: JSON.stringify(params)
	};

	return this._executeCommand('taobao.openim.immsg.push', paramTmp);
};

//发送自定义消息
IM.prototype.sendCustMsg = function(params){
	let paramTmp = {
		custmsg: JSON.stringify(params)
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}

//发送订单助手
IM.prototype.sendCustMsgOrder = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.order,          //订单助手
			data : JSON.stringify({
				type       : params.type,                      //1: 交易关闭、2:交易成功、3:卖家已发货、4:商家同意退货 5:拒绝退货、6:退款成功
				orderIcon  : params.orderIcon,                 //订单图
				orderTitle : params.orderTitle,                //订单标题
				orderNum   : params.orderNum,                  //运单编号
				orderId    : params.orderId,                   //订单id
				orderTime  : parseInt(Date.now()/1000),                 //时间
				wareId     : params.wareId,                     //商品id
				content    : params.content                     //消息内容
			}),
			from_nick: "订单助手",
			aps : {"alert": params.summary, "sound": "default"},
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}


	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}

//发送资产管家消息
IM.prototype.sendCustMsgFund = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.fund,        //资产管家
			data : JSON.stringify({
				type               : params.type,         //"1": 余额   "2": 代金券  "3": 购物卡
				assetManagerIcon   : params.assetManagerIcon,     
				assetManagerTitle  : params.assetManagerTitle,     // 标题
				assetManagerNum    : params.assetManagerNum,       // 钱数 "+50"
				orderTime          : parseInt(Date.now()/1000),              // 时间
				wareId             : params.wareId,                 //商品id
				content            : params.content                     //消息内容
			}),
			from_nick: "资产管家",
			aps : {"alert": params.summary, "sound": "default"},			
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary  
		})                         //预览
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}


//发送觅友购通告
IM.prototype.sendCustMsgNotify = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.notify,        //觅友购通告
			data : JSON.stringify({
				notifyTitle   : params.notifyTitle,            //订单标题
				wareId        : params.wareId,                     //商品id
				notifyIcon    : params.notifyIcon,               // 通告图片
				notifyTime    : parseInt(Date.now()/1000),              //通告时间
				content       : params.content,                     //消息内容
				url           : params.url,                     //跳网页
				type          : params.type                     // 0: 图文  1： 文字
			}),
			from_nick: "觅友购通告",
			aps : {"alert": params.summary, "sound": "default"},			
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}


//发送购物提醒
IM.prototype.sendCustMsgAlert = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.buyAlert,               //购物提醒
			data : JSON.stringify({
				type               : params.type,                       //"1"商品预售时间到
				shopNotifyTitle    : params.shopNotifyTitle,            //标题
				shopNotifyIcon     : params.shopNotifyIcon,             //图片
				assetManagerNum    : params.assetManagerNum,            //钱数
				time               : parseInt(Date.now()/1000),                        //通告时间
				wareId             : params.wareId,                     //商品id
				content            : params.content                     //消息内容
			}),
			from_nick: "购物提醒",
			aps : {"alert": params.summary, "sound": "default"},			
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}

//发送购物话题
IM.prototype.sendCustMsgTopic = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.buyTopic,                 //购物话题
			data : JSON.stringify({
				type               : params.type,
				shopTopicTitle     : params.shopTopicTitle,            //标题
				wareIcon           : params.wareIcon,                    //图片
				wareTitle          : params.wareTitle,                     //消息内容
				wareId             : params.wareId,                     //商品id
				
				toUserName         : params.toUserName,              //被评论话题发起人昵称
				toUserIcon         : params.toUserIcon,            //被评论话题发起人头像
				toTopic            : params.toTopic,               //被评论话题内容
				toTopicTime        : params.toTopicTime,            //被评论话题发起时间
				
				fromUserName       : params.fromUserName,         //本次话题发布人昵称
				fromTopic          : params.fromTopic,            //本次话题内容
				fromTopicTime      : params.fromTopicTime,        //本次话题发布时间
			}),
			from_nick: "话题",
			aps : {"alert": params.summary, "sound": "default"},			
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}


//发送推客邀请
IM.prototype.sendCustMsgTwitterInvitation = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.twitterInvitation,                 //购物话题
			data : JSON.stringify({
				fromUniqueId: params.fromUniqueId,  //邀请者
				toUniqueId:  params.toUniqueId,     //被邀请者
				icon : params.icon,                //头型
				nickname : params.nickname,        //昵称
				userLevel : params.userLevel,      //等级
				content: params.content,           //内容：     邀请您成为觅友购推客     
				url    : params.url,
				time : parseInt(Date.now()/1000)
			}),
			from_nick: "推客邀请函",
			aps : {"alert": params.summary, "sound": "default"},			
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}


//发送觅友购活动专区
IM.prototype.sendCustMsgPromotion = function(params){
	let paramTmp = {
		custmsg: JSON.stringify({
			from_user: Config.yunWangUserInfo.promotion,        //觅友购活动专区
			data : JSON.stringify({
				title         : params.title,            //活动标题
				icon          : params.icon,               // 活动图片
				time          : parseInt(Date.now()/1000),              //时间
				url           : params.url                     //跳网页
			}),
			from_nick: "觅友购活动专区",
			aps : {"alert": params.summary, "sound": "default"},			
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}

	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}


module.exports = new IM();