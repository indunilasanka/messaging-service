const AWS = require('aws-sdk');
const YAML = require('yamljs');

const config = YAML.load(`${__dirname}/../../serverless.env.yml`)[process.env.STAGE];

const DynamoDB = new AWS.DynamoDB({
  region: config.REGION,
  endpoint: config.DYNAMODB_ENDPOINT,
});

module.exports = {
  DynamoDB,
  config,
};
