import moment from 'moment';
import uuidv1 from 'uuid/v1';
import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_TABLE);

const create = async message => {
  const now = moment().toISOString();
  message.id = uuidv1();
  message.readBy = {};
  message.createdAt = now;

  let record = {};

  try {
    record = await repository.put(message);
  } catch (err) {
    throw new Error('Repository-Conversation-Create-Error');
  }

  record.readBy = JSON.stringify(record.readBy);
  return record;
};

export {
  create,
};
