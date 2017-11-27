
const Sequelize = require('sequelize');
const schemaName = require('path').basename(__filename, '.js');

const schemaModel = {
  user_id               : {type:Sequelize.STRING(50) , allowNull:false},  //商家ID
  code                  : {type: Sequelize.STRING(255) , allowNull:true}, //商品编号
  title                 : {type : Sequelize.STRING(255) , allowNull:true}, //商品标题
  ware_name             : {type : Sequelize.STRING(255) , allowNull:true}, //商品名称
};

const schemaOptions = {
  createdAt : false,
  freezeTableName: true, // Model tableName will be the same as the model name
  updatedAt : false
};

module.exports = {
  schemaName : schemaName,
  schemaModel : schemaModel,
  schemaOptions : schemaOptions,
  relation: [
    {
      mapping: "belongsTo",
      modelName: "xxxx",
      condition: {foreignKey : 'id' , targetKey : 'xx'}
    }
  ]
};


