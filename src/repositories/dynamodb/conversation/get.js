import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_TABLE);

const get = async id => {
  let record = false;

  try {
    record = await repository.get(id);
  } catch (err) {
    throw new Error('Repository-Conversation-Get-Error');
  }

  record.readBy = JSON.stringify(record.readBy);

  return record;
};

export {
  get,
};
