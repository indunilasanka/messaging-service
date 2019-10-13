import moment from 'moment';
import Repository from '../repository';
import { withProcessEnv } from '../client';
import { get } from './get';

const { CONVERSATION_MESSAGE_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_MESSAGE_TABLE);

const read = async (id, createdAt, userId) => {
  const keys = {
    id,
    createdAt,
  };

  const message = await get(id, createdAt);
  const readBy = message.readBy;

  let record = {};

  if (userId in readBy) {
    const params = {
      TableName: CONVERSATION_MESSAGE_TABLE,
      Key: keys,
      UpdateExpression: 'REMOVE readBy.#key',
      ExpressionAttributeNames: { '#key': userId },
      ReturnValues: 'ALL_NEW',
    };

    try {
      record = await repository.updateRaw(params);
    } catch (err) {
      throw new Error('Repository-Message-Read-Error');
    }

    return record.Attributes;
  }

  const now = moment().toISOString();

  const params = {
    TableName: CONVERSATION_MESSAGE_TABLE,
    Key: keys,
    UpdateExpression: 'SET readBy.#key = :value',
    ExpressionAttributeNames: { '#key': userId },
    ExpressionAttributeValues: { ':value': now },
    ReturnValues: 'ALL_NEW',
  };

  try {
    record = await repository.updateRaw(params);
  } catch (err) {
    throw new Error('Repository-Message-Read-Error');
  }

  return record.Attributes;
};

export {
  read,
};
