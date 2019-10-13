
import uuidv1 from 'uuid/v1';
import { isEmpty } from 'lodash';
import { create } from '../../repositories/dynamodb/message/create';
import { upload } from '../../repositories/s3/upload';

const IMAGE = 'image';

const messageCreate = async (args) => {
  let record = {};

  if (isEmpty(args)) {
    return record;
  }

  const {
    content, fileContent, fileType, fileName, createdBy, conversationId, isSystemGenerated,
  } = args;


  if (fileContent) {
    const type = fileContent.split(';')[0].split('/')[1];
    let key = '';

    if (fileType === IMAGE) {
      key = `${conversationId}_${uuidv1()}_${fileName}.${type}`;
    } else {
      key = `${conversationId}_${uuidv1()}_${fileName}.${fileType.split(':')[1]}`;
    }

    const uploadedContent = await upload(key, fileContent, fileType);

    const data = {
      content,
      fileContent: uploadedContent.Location,
      s3FileName: key,
      fileName,
      fileType,
      createdBy,
      conversationId,
      isSystemGenerated,
    };

    if (content) {
      data.content = content;
    }

    record = await create(data);
  } else {
    record = await create({
      content,
      createdBy,
      conversationId,
      isSystemGenerated,
    });
  }

  return record;
};

const resolver = {
  Mutation: {
    messageCreate,
  },
};

export {
  resolver,
};
