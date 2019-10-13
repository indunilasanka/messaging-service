import uuidv1 from 'uuid/v1';
import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_TABLE);

const addUser = async data => {
  data.id = uuidv1();
  data.isDeleted = false;

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
