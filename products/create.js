const AWS = require('aws-sdk')
const ProductTable = process.env.PRODUCT_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { v4: uuidv4 } = require('uuid');


module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: ProductTable,
        Item: {
            id: uuidv4(),
            name: data.name,
            description: data.description,
            imgUrl: data.imgUrl,
            price: data.price,
            discount: data.discount,
            isDeleted: 0
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