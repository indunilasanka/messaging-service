import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_USER_TABLE);

const getAllByUser = async (userId, from, to) => {
  const params = {
    TableName: CONVERSATION_USER_TABLE,
    IndexName: 'UserId',
    KeyConditionExpression: '(#user_id_field = :userId) AND (#created_at_field BETWEEN :from AND :to)',
    ExpressionAttributeNames: {
      '#user_id_field': 'userId',
      '#created_at_field': 'createdAt',
    },
    ExpressionAttributeValues: {
      ':from': from,
      ':to': to,
      ':userId': userId,
    },
  };

  const records = await repository.query(params);

  return records.Items;
};

export {
  getAllByUser,
};
