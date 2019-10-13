import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_USER_TABLE);

const deleteUser = async (id, conversationId) => {
  const keys = {
    userId: id,
    conversationId,
  };

  let record = {};
  const user = { isDeleted: true };

  try {
    record = await repository.update(keys, user);
  } catch (err) {
    throw new Error('Repository-Conversation-Delete-User-Error');
  }

  return record.Attributes;
};

export {
  deleteUser,
};
