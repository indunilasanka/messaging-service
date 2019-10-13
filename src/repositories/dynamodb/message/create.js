import moment from 'moment';
import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_MESSAGE_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_MESSAGE_TABLE);

const create = async message => {
  const now = moment().toISOString();

  message.id = `message:${message.conversationId}:${now.split('T')[0]}`;
  message.createdAt = now;
  message.isDeleted = false;
  message.archived = 'x';
  message.readBy = {};

  let record = {};

  try {
    record = await repository.put(message);
  } catch (err) {
    throw new Error('Repository-Message-Create-Error');
  }

  record.readBy = JSON.stringify(record.readBy);

  return record;
};

export {
  create,
};
