import s3Client from './client';

const { BUCKET_NAME } = process.env;
const s3 = new s3Client(BUCKET_NAME);
const IMAGE = 'image';
const DOCX = 'docx';
const CSV = 'csv';
const XLSX = 'xlsx';
const TXT = 'txt';
const PDF = 'pdf';
const mswordType = 'application/msword';
const plainType = 'text/plain';
const pdfType = 'application/pdf';

const upload = async (key, base64raw, contentType) => {
  const base64Data = new Buffer(base64raw.replace(/^data:.+;base64,/, ''), 'base64');
  let type = '';

  const params = {
    Key: key,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: '',
  };

  if (contentType !== IMAGE) {
    contentType = contentType.split(':')[1];
  } else {
    type = base64raw.split(';')[0].split('/')[1];
  }

  switch (contentType) {
    case IMAGE:
      params.ContentType = `${IMAGE}/${type}`;
      break;
    case DOCX:
    case CSV:
    case XLSX:
      params.ContentType = mswordType;
      break;
    case TXT:
      params.ContentType = plainType;
      break;
    case PDF:
      params.ContentType = pdfType;
      break;
    default:
      break;
  }

  const response = await s3.upload(params).promise();

  return response;
};

export {
  upload,
};
