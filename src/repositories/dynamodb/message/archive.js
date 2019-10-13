import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_MESSAGE_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_MESSAGE_TABLE);

const archive = async (id, createdAt) => {
  const keys = {
    id,
    createdAt,
  };

  let record = {};
  const message = {
    isDeleted: true,
    archived: 'o',
  };

  try {
    record = await repository.update(keys, message);
  } catch (err) {
    throw new Error('Repository-Message-Archive-Error');
  }

  return record.Attributes;
};

export {
  archive,
};
