"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.documentClientPut = exports.query = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({
    credentials: {
        accessKeyId: Math.random().toString(),
        secretAccessKey: Math.random().toString() // Only for Demo purposes these should come from a safe place and not from a static config file
    },
    region: 'eu-west-1'
    // endpoint: 'http://localhost:8000'
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
async function query(queryInput) {
    try {
        return await ddbDocClient.send(new lib_dynamodb_1.QueryCommand(queryInput));
    }
    catch (err) {
        console.log(err);
        handleGetItemError(err);
        return err;
    }
}
exports.query = query;
async function documentClientPut(putInput) {
    console.log(putInput);
    try {
        const results = await ddbDocClient.send(new lib_dynamodb_1.PutCommand(putInput));
        return results;
    }
    catch (err) {
        console.log(err);
        handleGetItemError(err);
        return err;
    }
}
exports.documentClientPut = documentClientPut;
async function execute(queryInput) {
    const data = await query(queryInput);
    return data;
}
exports.execute = execute;
function handleGetItemError(err) {
    if (!err) {
        console.error('Encountered error object was empty');
        return;
    }
    if (!err.code) {
        console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
        return;
    }
    // here are no API specific errors to handle for GetItem, common DynamoDB API errors are handled below
    handleCommonErrors(err);
}
function handleCommonErrors(err) {
    switch (err.code) {
        case 'InternalServerError':
            console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'ProvisionedThroughputExceededException':
            console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off.` +
                `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
            return;
        case 'ResourceNotFoundException':
            console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
            return;
        case 'ServiceUnavailable':
            console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'ThrottlingException':
            console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'UnrecognizedClientException':
            console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying.` +
                `Error: ${err.message}`);
            return;
        case 'ValidationException':
            console.error(`The input fails to satisfy the constraints specified by DynamoDB, ` +
                `fix input before retrying. Error: ${err.message}`);
            return;
        case 'RequestLimitExceeded':
            console.error(`Throughput exceeds the current throughput limit for your account, ` +
                `increase account level throughput before retrying. Error: ${err.message}`);
            return;
        default:
            console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
            return;
    }
}
