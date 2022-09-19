const AWS = require('aws-sdk')
const ProductTable = process.env.PRODUCT_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: ProductTable
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
        console.log("🚀 ~ file: list.js ~ line 11 ~ dynamoDb.get ~ result", result)

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    });
};