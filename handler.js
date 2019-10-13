import { isEmpty } from 'lodash';
import { getResolvers } from './src/core/resolvers';
import { create } from './src/repositories/dynamodb/user/create';
import { get } from './src/repositories/dynamodb/user/get';
import { update } from './src/repositories/dynamodb/user/update';

exports.graphql = async (event) => {
  const resolvers = getResolvers();
  const {
    TypeName, FieldName, Arguments, Source,
  } = event;
  const typeResolver = resolvers[TypeName];
  const fieldResolver = typeResolver[FieldName];

  if (!typeResolver) {
    return new Error(`No resolvers found for type: '${TypeName}'`);
  }
  if (!fieldResolver) {
    return new Error(`No resolvers found for field: '${FieldName}' on type: '${TypeName}'`);
  }

  const result = fieldResolver((isEmpty(Arguments) ? Source : Arguments));

  return result;
};

exports.user = async (event) => {
  const { body } = event.Records[0];

  const data = JSON.parse(body);
  const userData = JSON.parse(data.Message);
  const user = await get(userData.userId);

  let record = null;

  if (user) {
    record = await update(userData);
    console.log(record);
    return 'USER_UPDATED';
  }
  record = await create(userData);
  console.log(record);
  return 'USER_ADDED';
};
