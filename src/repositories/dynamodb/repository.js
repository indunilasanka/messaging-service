import { concat } from 'lodash';

export default class Repository {
  constructor(documentClient, tableName) {
    this.documentClient = documentClient;
    this.tableName = tableName;
  }

  get baseParams() {
    return {
      TableName: this.tableName,
    };
  }

  async list() {
    const params = this.createParamObject();
    const response = await this.documentClient.scan(params).promise();

    return response.Items || [];
  }

  async get(id) {
    const params = this.createParamObject({
      Key: {
        id,
      },
    });

    const response = await this.documentClient.get(params).promise();

    return response.Item;
  }

  async getByKey(key) {
    const params = this.createParamObject({
      Key: key,
    });

    const response = await this.documentClient.get(params).promise();

    return response.Item;
  }

  async put(data) {
    const params = this.createParamObject({
      Item: data,
    });

    await this.documentClient.put(params).promise();

    return data;
  }

  async update(key, data) {
    const ExpressionAttributeNames = {};
    Object.keys(data).forEach((index) => {
      ExpressionAttributeNames[`#${index}`] = index;
    });

    const ExpressionAttributeValues = {};
    Object.keys(data).forEach((index) => {
      ExpressionAttributeValues[`:${index}`] = data[index];
    });

    let UpdateExpression = [];
    Object.keys(data).forEach((index) => {
      UpdateExpression.push(`#${index} = :${index}`);
    });
    UpdateExpression = `SET ${UpdateExpression.join(', ')}`;

    const params = this.createParamObject({
      Key: key,
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    const record = await this.documentClient.update(params).promise();

    return record;
  }

  async updateRaw(params) {
    const record = await this.documentClient.update(params).promise();

    return record;
  }

  async delete(id) {
    const params = this.createParamObject({
      Key: {
        id,
      },
    });

    await this.documentClient.delete(params).promise();

    return true;
  }

  async query(params) {
    const query = params => new Promise((resolve, reject) => {
      this.documentClient.query(params, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });

    let Items = [];
    let Count = 0;
    let result = null;

    do {
      result = await query(params);
      Count += result.Count;
      if (result.Items) {
        Items = concat(Items, result.Items);
      }
      if (result.LastEvaluatedKey) {
        params.ExclusiveStartKey = result.LastEvaluatedKey;
      }
    } while (result.LastEvaluatedKey);

    return {
      Count,
      Items,
    };
  }

  createParamObject(additionalArgs = {}) {
    return { ...this.baseParams, ...additionalArgs };
  }
}
