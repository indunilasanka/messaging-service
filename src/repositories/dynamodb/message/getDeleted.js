import { sortBy } from 'lodash';
import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_MESSAGE_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_MESSAGE_TABLE);

const getDeleted = async (userId) => {
  const params = {
    TableName: CONVERSATION_MESSAGE_TABLE,
    IndexName: 'IsDeleted',
    KeyConditionExpression: '(#userid_field = :id) AND (#is_deleted = :deleted)',
    ExpressionAttributeNames: {
      '#userid_field': 'createdBy',
      '#is_deleted': 'archived',
    },
    ExpressionAttributeValues: {
      ':id': userId,
      ':deleted': 'o',
    },
  };

  const result = await repository.query(params);
  const rawRecords = result.Items;
  let records = [];

  rawRecords.forEach(record => {
    record.readBy = JSON.stringify(Object.entries(record.readBy));
    records.push(record);
  });
  records = sortBy(records, 'createdAt');

  return records;
};

export {
  getDeleted,
};
