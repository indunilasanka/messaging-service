import moment from 'moment';
import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_USER_TABLE);

const addUser = async data => {
  const now = moment().toISOString();

  data.isDeleted = false;
  data.createdAt = now;

  let record = {};

  try {
    record = await repository.put(data);
  } catch (err) {
    throw new Error('Repository-Conversation-Add-User-Error');
  }

  return record;
};

export {
  addUser,
};
