import moment from 'moment';
import Repository from '../repository';
import { withProcessEnv } from '../client';
import { get } from './get';

const { CONVERSATION_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_TABLE);

const read = async (id, userId) => {
  const conversation = await get(id);
  const readBy = JSON.parse(conversation.readBy);

  let record = {};

  if (userId in readBy) {
    const params = {
      TableName: CONVERSATION_TABLE,
      Key: { id },
      UpdateExpression: 'REMOVE readBy.#key',
      ExpressionAttributeNames: { '#key': userId },
      ReturnValues: 'ALL_NEW',
    };

    try {
      record = await repository.updateRaw(params);
    } catch (err) {
      throw new Error('Repository-Conversation-Read-Error');
    }

    return record.Attributes;
  }

  const now = moment().toISOString();
  const params = {
    TableName: CONVERSATION_TABLE,
    Key: { id },
    UpdateExpression: 'SET readBy.#key = :value',
    ExpressionAttributeNames: { '#key': userId },
    ExpressionAttributeValues: { ':value': now },
    ReturnValues: 'ALL_NEW',
  };

  try {
    record = await repository.updateRaw(params);
  } catch (err) {
    throw new Error('Repository-Conversation-Read-Error');
  }

  return record.Attributes;
};

export {
  read,
};
