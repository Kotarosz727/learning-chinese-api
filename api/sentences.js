"use strict";

const { DynamoDB } = require("aws-sdk");
const db = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

const dynamoDB = {
  TableName: tableName,
};

module.exports.fetchList = async (event) => {
  
  const params = {
    TableName: tableName,
    KeyConditionExpression: "#info = :info",
    ExpressionAttributeNames: { "#info": "info" },
    ExpressionAttributeValues: {
      ":info": event.queryStringParameters.info,
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

module.exports.postFavorite = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "UserFavorite",
    Item: {
      userid: data.userid,
      chinese: data.chinese,
      japanese: data.japanese,
      pinin: data.pinin,
      type: data.type
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
    TableName: "UserFavorite",
    KeyConditionExpression: "#userid = :userid",
    ExpressionAttributeNames: { "#userid": "userid" },
    ExpressionAttributeValues: {
      ":userid": data.userid,
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

module.exports.deleteFavorite = async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "UserFavorite",
    Key: {
      userid: data.userid,
      chinese: data.chinese,
    },
  };

  try {
    const result = await db.delete(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "deleted succesfully", data: result }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message,
    };
  }
};
