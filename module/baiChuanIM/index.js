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
			data : JSON.stringify({}),
			from_nick: "订单助手",
			aps : {"alert": params.summary, "sound": "default"},
			to_users : params.toUsers,                         //接收消息者string[]
			summary  : params.summary                           //预览
		})
	}


	return this._executeCommand('taobao.openim.custmsg.push', paramTmp);
}

module.exports = new IM();