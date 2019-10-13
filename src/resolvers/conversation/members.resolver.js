import { isEmpty } from 'lodash';
import { getAllByConversation } from '../../repositories/dynamodb/conversationUser/getAllByConversation';

const members = async (args) => {
  let records = [];

  if (isEmpty(args)) {
    return records;
  }

  const { id } = args;

  records = await getAllByConversation(id);

  return records;
};
const resolver = {
  Conversation: {
    members,
  },
};

export {
  resolver,
};
