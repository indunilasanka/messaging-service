import { isEmpty } from 'lodash';
import { getDeleted } from '../../repositories/dynamodb/message/getDeleted';

const ARCHIVED = 'archived';
const UNREAD = 'unread';

const messages = async (args) => {
  let records = [{}];
  if (isEmpty(args)) {
    return records;
  }

  const { filter, query, userId } = args;


  switch (filter) {
    case ARCHIVED:
      records = await getDeleted(userId, query);
      break;
    case UNREAD:
      records = [{}];
      break;
    default:
      records = [{}];
  }

  return records;
};

const resolver = {
  Query: {
    messages,
  },
};

export {
  resolver,
};
