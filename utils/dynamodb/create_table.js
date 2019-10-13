const { DynamoDB, config } = require('./setup');

const conversation = {
  AttributeDefinitions: [{
    AttributeName: 'id',
    AttributeType: 'S',
  },
  {
    AttributeName: 'createdBy',
    AttributeType: 'S',
  },
  ],
  KeySchema: [{
    AttributeName: 'id',
    KeyType: 'HASH',
  }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: `${config.CONVERSATION_TABLE}`,
  GlobalSecondaryIndexes: [{
    IndexName: 'UserId',
    KeySchema: [{
      AttributeName: 'createdBy',
      KeyType: 'HASH',
    }],
    Projection: {
      ProjectionType: 'ALL',
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }],
};

const conversationUser = {
  AttributeDefinitions: [{
    AttributeName: 'userId',
    AttributeType: 'S',
  },
  {
    AttributeName: 'conversationId',
    AttributeType: 'S',
  },
  {
    AttributeName: 'createdAt',
    AttributeType: 'S',
  },
  ],
  KeySchema: [{
    AttributeName: 'userId',
    KeyType: 'HASH',
  }, {
    AttributeName: 'conversationId',
    KeyType: 'RANGE',
  }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: `${config.CONVERSATION_USER_TABLE}`,
  LocalSecondaryIndexes: [{
    IndexName: 'UserId',
    KeySchema: [{
      AttributeName: 'userId',
      KeyType: 'HASH',
    }, {
      AttributeName: 'createdAt',
      KeyType: 'RANGE',
    }],
    Projection: {
      ProjectionType: 'ALL',
    },
  }],
  GlobalSecondaryIndexes: [{
    IndexName: 'ConversationId',
    KeySchema: [{
      AttributeName: 'conversationId',
      KeyType: 'HASH',
    }, {
      AttributeName: 'createdAt',
      KeyType: 'RANGE',
    }],
    Projection: {
      ProjectionType: 'ALL',
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }],
};

const conversationMessage = {
  AttributeDefinitions: [{
    AttributeName: 'id',
    AttributeType: 'S',
  },
  {
    AttributeName: 'createdAt',
    AttributeType: 'S',
  },
  {
    AttributeName: 'createdBy',
    AttributeType: 'S',
  },
  {
    AttributeName: 'archived',
    AttributeType: 'S',
  },
  ],
  KeySchema: [{
    AttributeName: 'id',
    KeyType: 'HASH',
  },
  {
    AttributeName: 'createdAt',
    KeyType: 'RANGE',
  },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: `${config.CONVERSATION_MESSAGE_TABLE}`,
  GlobalSecondaryIndexes: [{
    IndexName: 'IsDeleted',
    KeySchema: [{
      AttributeName: 'createdBy',
      KeyType: 'HASH',
    }, {
      AttributeName: 'archived',
      KeyType: 'RANGE',
    }],
    Projection: {
      ProjectionType: 'ALL',
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }],

};

const userTable = {
  AttributeDefinitions: [{
    AttributeName: 'userId',
    AttributeType: 'S',
  }],
  KeySchema: [{
    AttributeName: 'userId',
    KeyType: 'HASH',
  }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: `${config.USER_TABLE}`,
};

const ddbCreate = params => (
  new Promise((resolve, reject) => {
    DynamoDB.createTable(params, (err, data) => {
      if (err) {
        reject(err.toString());
      } else {
        resolve(data);
      }
    });
  })
);

const create = async () => {
  try {
    console.log(await (ddbCreate(conversation)));
    console.log(await (ddbCreate(conversationUser)));
    console.log(await (ddbCreate(conversationMessage)));
    console.log(await (ddbCreate(userTable)));
  } catch (err) {
    console.log(err);
    throw new Error(`Error creating tables: ${err.message}`);
  }
};

create();
