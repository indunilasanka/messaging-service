import { isEmpty } from 'lodash';
import { read } from '../../repositories/dynamodb/conversation/read';

const conversationRead = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { id, userId } = args;

  record = await read(id, userId);

  record.readBy = JSON.stringify(Object.entries(record.readBy));

  return record;
};

const resolver = {
  Mutation: {
    conversationRead,
  },
};

export {
  resolver,
};
