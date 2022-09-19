const AWS = require('aws-sdk')
const UserTable = process.env.USER_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: UserTable,
        Item: {
            id: data.id,
            name: data.name,
            phone:data.phone,
            address:data.address,
            token:data.token
        }
    }
    dynamoDb.put(params, (err) => {
        if (err) {
            console.log(err);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
}