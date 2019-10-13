import Repository from '../repository';
import { withProcessEnv } from '../client';

const { USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, USER_TABLE);

const get = async id => {
  let record = false;

  const key = { userId: id };

  try {
    record = await repository.getByKey(key);
  } catch (err) {
    console.log(err);
    throw new Error('Repository-User-Get-Error');
  }

  return record;
};

export {
  get,
};
