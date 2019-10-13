import Repository from '../repository';
import { withProcessEnv } from '../client';

const { USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, USER_TABLE);

const create = async user => {
  let record = {};

  try {
    record = await repository.put(user);
  } catch (err) {
    throw new Error('Repository-User-Create-Error');
  }

  return record;
};

export {
  create,
};
