import AWS from 'aws-sdk';

export default class s3Client {
  constructor(bucketName) {
    this.s3Client = new AWS.S3();
    this.bucketName = bucketName;
  }

  async upload(params) {
    params.Bucket = this.bucketName;
    const response = await this.s3Client.upload(params).promise();
    return response;
  }
}
