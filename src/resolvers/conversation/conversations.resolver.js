import { isEmpty } from 'lodash';
import { getAllByUser } from '../../repositories/dynamodb/conversationUser/getAllByUser';

const conversations = async (args) => {
  let records = [];

  if (isEmpty(args)) {
    return records;
  }

  const { userId, from, to } = args;

  records = await getAllByUser(userId, from, to);

  return records;
};
const resolver = {
  Query: {
    conversations,
  },
};

export {
  resolver,
};
