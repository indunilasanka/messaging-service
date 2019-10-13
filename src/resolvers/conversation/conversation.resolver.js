import { isEmpty } from 'lodash';
import { get } from '../../repositories/dynamodb/conversation/get';

const conversation = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { id, from, to } = args;
  record = await get(id);
  record.from = from;
  record.to = to;

  return record;
};
const resolver = {
  Query: {
    conversation,
  },
};

export {
  resolver,
};
