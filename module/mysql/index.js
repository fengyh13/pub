/**
 * Created by liutao on 16/12/14.
 */

const fs = require('fs');

const path = require('path');

const schemaPath = path.join(__dirname, "schema");

const mysqlSchemaList = fs.readdirSync(schemaPath);

const Sequelize = require('sequelize');

const mysqlConfig = require('../../config').mysqlConnect;

const obj = {};

const async = require('async');

const mysqlConnect = new Sequelize(
  
  mysqlConfig.dataBase,
  mysqlConfig.account,
  mysqlConfig.password,{
    host : mysqlConfig.host,
    port : mysqlConfig.port,
    dialect : mysqlConfig.dialect,
    logging : mysqlConfig.logging,
  }
);

async.map(mysqlSchemaList, (fileName, next) => {
  if (fileName) {
    const schemaName = fileName.split(".")[0];
    const model = require(path.join(schemaPath, schemaName));
    
    const modelConnection = mysqlConnect.define(model.schemaName, model.schemaModel, model.schemaOptions);
  
    module.exports[schemaName] = modelConnection;
    obj[model.schemaName] = Object.assign({ conn: modelConnection }, model);
    next();
  } else {
    next();
  }
}, () => {
  module.exports['connect'] = mysqlConnect;
  
  for (var schemaName of Object.keys(obj)) {
    const model = obj[schemaName];
    const conn = model.conn;
    const relations = model.relation;
    if (!relations) continue;
    
    for (var relation of relations) {
      conn.belongsTo(obj[relation.modelName].conn, relation.condition);
    }
  }
});
