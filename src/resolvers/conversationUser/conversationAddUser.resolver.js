import { isEmpty } from 'lodash';
import { addUser } from '../../repositories/dynamodb/conversationUser/addUser';

const conversationAddUser = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { id, userId } = args;

  record = await addUser({
    conversationId: id,
    userId,
  });

  return record;
};

const resolver = {
  Mutation: {
    conversationAddUser,
  },
};

export {
  resolver,
};
