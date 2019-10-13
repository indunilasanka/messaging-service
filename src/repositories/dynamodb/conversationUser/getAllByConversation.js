import Repository from '../repository';
import { withProcessEnv } from '../client';

const { CONVERSATION_USER_TABLE } = process.env;
const docClient = withProcessEnv(process.env)();
const repository = new Repository(docClient, CONVERSATION_USER_TABLE);

const getAllByConversation = async (conversationId) => {
  const params = {
    TableName: CONVERSATION_USER_TABLE,
    IndexName: 'ConversationId',
    KeyConditionExpression: '(#conversation_id_field = :conversationId) ',
    ExpressionAttributeNames: {
      '#conversation_id_field': 'conversationId',
    },
    ExpressionAttributeValues: {

      ':conversationId': conversationId,
    },
  };

  const records = await repository.query(params);

  return records.Items;
};

export {
  getAllByConversation,
};
