import { isEmpty } from 'lodash';
import { remove } from '../../repositories/dynamodb/conversation/remove';

const conversationDelete = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { id } = args;

  record = await remove(id);

  return record;
};

const resolver = {
  Mutation: {
    conversationDelete,
  },
};

export {
  resolver,
};
