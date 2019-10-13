import { isEmpty } from 'lodash';
import { get } from '../../repositories/dynamodb/user/get';

const info = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { userId } = args;

  record = await get(userId);

  return record;
};
const resolver = {
  ConversationUser: {
    info,
  },
};

export {
  resolver,
};
