const { DynamoDB, config } = require('./setup');

const deleteLocalTable = TableName => (
  new Promise((resolve, reject) => {
    DynamoDB.deleteTable({ TableName },
      (err, data) => {
        if (err) {
          reject(err.toString());
        } else {
          resolve(data);
        }
      });
  })
);

const purge = async () => {
  try {
    console.log(await (deleteLocalTable(`${config.CONVERSATION_TABLE}`)));
    console.log(await (deleteLocalTable(`${config.CONVERSATION_USER_TABLE}`)));
    console.log(await (deleteLocalTable(`${config.CONVERSATION_MESSAGE_TABLE}`)));
    console.log(await (deleteLocalTable(`${config.USER_TABLE}`)));
    require('./create_table');
  } catch (err) {
    throw new Error(`Error purging tables: ${err.message}`);
  }
};

purge();
