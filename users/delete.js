const AWS = require('aws-sdk')
const UserTable = process.env.USER_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.delete = (event, context, callback) => {
    const params = {
        TableName: UserTable,
        Key: {
            id: event.pathParameters.id,
        },
    };
    dynamoDb.delete(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the users.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
        callback(null, response);
    });

}