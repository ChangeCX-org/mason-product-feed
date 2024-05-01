import AWS from "aws-sdk";
//Comment this to work on Lambda
import dotenv from "dotenv";
dotenv.config();

var credentials = new AWS.SharedIniFileCredentials({profile: 'work-account'});
AWS.config.credentials = credentials;
//Comment this to work on Lambda
const s3 = new AWS.S3({
  accessKeyId: credentials.aws_access_key_id,
  secretAccessKey: credentials.aws_secret_access_key,
  Bucket: process.env.AWS_BUCKET,
});

//Comment this to work on Local
//const s3 = new AWS.S3();

export const s3ReadFolder = async () => {
  const listObjectParams = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: process.env.AWS_PREFIX,
  };

  return new Promise((resolve, reject) => {
    s3.listObjectsV2(listObjectParams, (err, data) => {
      if (!err) {
        resolve(data?.Contents);
      } else {
        console.log("Error in reading folder", err);
        reject(err);
      }
    });
  });
};

export const s3ReadObject = async (content) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: content?.Key,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (!err) {
        const csvData = data.Body.toString("utf-8");
        // console.log("CSV Data", csvData);
        resolve(csvData);
      } else {
        console.log("Error in reading object", err);
        reject(err);
      }
    });
  });
};

export const copyFile = async (content) => {
  console.log("Copying Object :", content);
  const keyArray = content?.Key.split("/");
  const s3Params = {
    Bucket: process.env.AWS_BUCKET,
    CopySource: `${process.env.AWS_BUCKET}/${content?.Key}`,
    Key: `Archive/${keyArray[1]}`,
  };
  return s3.copyObject(s3Params).promise();
};

export const deleteFile = async (content) => {
  console.log("Deleting Object ", content.Key);
  return s3
    .deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: content?.Key,
    })
    .promise();
};
