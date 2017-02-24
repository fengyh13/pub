/**
 * Created by liutao on 16/12/14.
 */

'use strict';

const redis = require('redis');

const config = require('../../config');

const coRedis = require('co-redis');

const redisClient = redis.createClient(config.redis.port, config.redis.host);

const redisKoa = coRedis(redisClient);

redisClient.on("error", function (err) {
  console.log("redisClient连接错误:", err);
});

module.exports = redisKoa;