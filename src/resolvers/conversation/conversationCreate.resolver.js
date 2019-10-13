import { isEmpty } from 'lodash';
import { create } from '../../repositories/dynamodb/conversation/create';
import { addUser } from '../../repositories/dynamodb/conversationUser/addUser';

const conversationCreate = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const { createdBy } = args;

  record = await create({
    createdBy,
  });

  await addUser({
    conversationId: record.id,
    userId: createdBy,
  });

  return record;
};

const resolver = {
  Mutation: {
    conversationCreate,
  },
};

export {
  resolver,
};
