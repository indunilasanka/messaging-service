import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const withProcessEnv = (env) => () => {
  const IS_OFFLINE = env.IS_OFFLINE;

  if (IS_OFFLINE === 'true') {
    const { DYNAMODB_ENDPOINT } = env;

    const options = {
      endpoint: DYNAMODB_ENDPOINT,
      region: 'none',
    };

    return new DocumentClient(options);
  }
  return new DocumentClient();
};

export {
  withProcessEnv,
};
