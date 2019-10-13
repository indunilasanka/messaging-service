import moment from 'moment';
import { filter, map, sortBy } from 'lodash';
import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_MESSAGE_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_MESSAGE_TABLE);

const getDays = (from, to) => {
  const days = [];
  const current = moment(from);

  if (current.toISOString().split('T')[0] !== to.split('T')[0]) {
    do {
      days.push(current.toISOString().split('T')[0]);
      current.add(1, 'day');
    } while (current.toISOString().split('T')[0] !== to.split('T')[0]);
  }

  days.push(current.toISOString().split('T')[0]);

  return days;
};

const getAll = async (conversationId, from, to) => {
  const days = getDays(from, to);

  const len = days.length;
  const batch = [];

  const params = {
    TableName: CONVERSATION_MESSAGE_TABLE,
    KeyConditionExpression: '(#id_field = :id) AND (#created_at_field BETWEEN :from AND :to)',
    ExpressionAttributeNames: {
      '#id_field': 'id',
      '#created_at_field': 'createdAt',
    },
    ExpressionAttributeValues: {
      ':from': from,
      ':to': to,
    },
  };

  for (let i = 0; i < len; i += 1) {
    params.ExpressionAttributeValues[':id'] = `message:${conversationId}:${days[i]}`;
    batch.push(repository.query(params));
  }

  let records = [];
  const chunks = filter(await Promise.all(batch), result => result.Count > 0);

  map(chunks, chunk => chunk.Items).forEach(item => item.forEach(record => {
    record.readBy = JSON.stringify(Object.entries(record.readBy));
    records.push(record);
  }));
  records = sortBy(records, 'createdAt');

  return records;
};

export {
  getAll,
};
