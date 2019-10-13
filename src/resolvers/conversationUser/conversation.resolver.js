import { isEmpty } from 'lodash';
import { get } from '../../repositories/dynamodb/conversation/get';

const conversation = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { conversationId } = args;

  record = await get(conversationId);

  return record;
};
const resolver = {
  ConversationUser: {
    conversation,
  },
};

export {
  resolver,
};
