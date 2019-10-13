import { isEmpty } from 'lodash';
import { deleteUser } from '../../repositories/dynamodb/conversationUser/deleteUser';

const conversationDeleteUser = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }


  const { id, userId } = args;

  record = await deleteUser(userId, id);

  return record;
};

const resolver = {
  Mutation: {
    conversationDeleteUser,
  },
};

export {
  resolver,
};
