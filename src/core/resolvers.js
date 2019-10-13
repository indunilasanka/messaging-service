import { merge } from 'lodash';

const requires = [
  require('./../resolvers/conversation/conversation.resolver'),
  require('./../resolvers/conversation/conversationCreate.resolver'),
  require('./../resolvers/conversation/conversationDelete.resolver'),
  require('./../resolvers/conversation/conversationRead.resolver'),
  require('./../resolvers/conversation/conversations.resolver'),
  require('./../resolvers/conversation/members.resolver'),
  require('./../resolvers/conversation/messages.resolver'),
  require('./../resolvers/conversationUser/conversation.resolver'),
  require('./../resolvers/conversationUser/conversationAddUser.resolver'),
  require('./../resolvers/conversationUser/conversationDeleteUser.resolver'),
  require('./../resolvers/conversationUser/info.resolver'),
  require('./../resolvers/message/messageCreate.resolver'),
  require('./../resolvers/message/messageDelete.resolver'),
  require('./../resolvers/message/messageRead.resolver'),
  require('./../resolvers/message/messages.resolver'),
];

const getResolvers = () => {
  const resolvers = [];

  for (let index = 0; index < requires.length; index += 1) {
    const { resolver } = requires[index];
    resolvers.push(resolver);
  }
  return merge({}, ...resolvers);
};

export {
  getResolvers,
};
