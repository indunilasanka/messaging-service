import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_MESSAGE_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_MESSAGE_TABLE);

const get = async (id, createdAt) => {
  let record = false;
  const keys = { id, createdAt };

  try {
    record = await repository.getByKey(keys);
  } catch (err) {
    console.log(err);
    throw new Error('Repository-Message-Get-Error');
  }

  return record;
};

export {
  get,
};
