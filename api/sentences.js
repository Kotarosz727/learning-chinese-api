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

module.exports.postFavorite = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: tableName,
    Item: {
      firstid: data.firstid,
      secondid: data.secondid,
      chinese: data.chinese,
      japanese: data.japanese,
      pinin: data.pinin,
    },
  };

  try {
    const result = await db.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
};

module.exports.fetchFavorite = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: tableName,
    IndexName: "secondid-firstid-index",
    KeyConditionExpression: "#userid = :secondid" ,
    ExpressionAttributeNames: {"#userid":"secondid"},
    ExpressionAttributeValues: {
      ":secondid": data.secondid,
    },
  };

  try {
    const result = await db.query(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
};
