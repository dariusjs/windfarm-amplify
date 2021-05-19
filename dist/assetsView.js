"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windTurbineReadingsQuery = exports.windFarmQuery = exports.windTurbineQuery = void 0;
const dynamo_1 = require("./dynamo");
async function windTurbineQuery(sk) {
    const data = await dynamo_1.query({
        TableName: 'windfarm',
        IndexName: 'assets',
        KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
        ExpressionAttributeNames: { '#pk': 'gsi1pk1', '#sk': 'gsi1sk1' },
        ExpressionAttributeValues: { ':pk': 'turbine', ':sk': `windfarm#${sk}` },
        ReturnConsumedCapacity: 'TOTAL'
    });
    return data.Items;
}
exports.windTurbineQuery = windTurbineQuery;
async function windFarmQuery() {
    const data = await dynamo_1.query({
        TableName: 'windfarm',
        IndexName: 'assets',
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: { '#pk': 'gsi1pk1' },
        ExpressionAttributeValues: { ':pk': 'windfarm' },
        ReturnConsumedCapacity: 'TOTAL'
    });
    return data.Items;
}
exports.windFarmQuery = windFarmQuery;
async function windTurbineReadingsQuery(pk) {
    const data = await dynamo_1.query({
        TableName: 'windfarm',
        KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
        ExpressionAttributeNames: {
            '#pk': 'pk',
            '#sk': 'sk'
        },
        ExpressionAttributeValues: {
            ':pk': pk,
            ':sk': 'reading'
        },
        ScanIndexForward: false,
        ReturnConsumedCapacity: 'TOTAL'
        // Limit: 10
    });
    return data.Items;
}
exports.windTurbineReadingsQuery = windTurbineReadingsQuery;
