import { isEmpty } from 'lodash';
import { archive } from '../../repositories/dynamodb/message/archive';

const messageDelete = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { id, createdAt } = args;

  record = await archive(id, createdAt);

  record.readBy = JSON.stringify(Object.entries(record.readBy));

  return record;
};

const resolver = {
  Mutation: {
    messageDelete,
  },
};

export {
  resolver,
};
