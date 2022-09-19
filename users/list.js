const AWS = require('aws-sdk')
const UserTable = process.env.USER_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: UserTable
    };

    dynamoDb.scan(params, (error, result) => {
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
            body: JSON.stringify(result.Items),
        };
        console.log(response)
        callback(null, response);
    });
};