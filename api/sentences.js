"use strict";

const { DynamoDB } = require("aws-sdk");
const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

const dynamoDB = {
  TableName: tableName,
};

module.exports.fetchList = async () => {
  try {
    const result = await db.scan(dynamoDB).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
};

module.exports.postFavorite = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    tableName: tableName,
    Item: {
      firstid: data.firstid,
      secondid: data.userid,
      chinese: data.chinese,
      japanese: data.japanese,
      pinin: data.pinin,
    },
  };

  try {
    await db.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
};
