import moment from 'moment';
import { isEmpty } from 'lodash';
import { getAll } from '../../repositories/dynamodb/message/getAll';

const messages = async (args) => {
  let records = [];

  if (isEmpty(args)) {
    return records;
  }

  const { id } = args;
  let { from, to } = args;

  if (!from) {
    from = moment().startOf('day').toISOString();
  }

  if (!to) {
    to = moment().endOf('day').toISOString();
  }

  records = await getAll(id, from, to);

  return records;
};
const resolver = {
  Conversation: {
    messages,
  },
};

export {
  resolver,
};
