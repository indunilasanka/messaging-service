import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_TABLE);

const remove = async id => {
  let record = false;

  try {
    record = await repository.delete(id);
  } catch (err) {
    throw new Error('Repository-Conversation-Remove-Error');
  }

  return record;
};

export {
  remove,
};
