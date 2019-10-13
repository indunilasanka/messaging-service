import Repository from '../repository';
import { withProcessEnv } from '../client';

const { USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, USER_TABLE);

const update = async (user) => {
  let record = {};
  const key = {
    userId: user.userId,
  };

  delete user.userId;

  try {
    record = await repository.update(key, user);
  } catch (err) {
    throw new Error('Repository-User-Update-Error');
  }

  return record.Attributes;
};

export {
  update,
};
