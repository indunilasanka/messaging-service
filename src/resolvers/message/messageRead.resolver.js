import { isEmpty } from 'lodash';
import { read } from '../../repositories/dynamodb/message/read';

const messageRead = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { id, createdAt, userId } = args;

  record = await read(id, createdAt, userId);
  record.readBy = JSON.stringify(Object.entries(record.readBy));

  return record;
};

const resolver = {
  Mutation: {
    messageRead,
  },
};

export {
  resolver,
};
