'use strict';

const {DynamoDB} = require("aws-sdk");
const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.fetchList = async() => {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await db.scan(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch(error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    };
  }
};
