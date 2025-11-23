'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({endpoint: process.env.FILEBASE_S3, signatureVersion: process.env.FILEBASE_S3_VER});
const baseUrl = process.env.FILEBASE_BASE_URL;

exports.buckets = { default: process.env.FILEBASE_BUCKETS_DEFAULT };

exports.getFileName = (file_url) => file_url.replace(baseUrl);

exports.upload = async (bucket, name, file, fileType) => new Promise((resolve, reject) => {
    var params = {
        Bucket: bucket,
        Key: name,
        ContentType: fileType,
        Body: file,
    };
    const request = s3.putObject(params, function(error, data) {
        if (error) {
          console.error(error);
        } else {
          console.log('Envio bem sucedido de arquivo %s - %s:%s\n%o', fileType, name, bucket, data);
          return baseUrl + data.ETag;
        }
    }).on('httpHeaders', (statusCode, headers) => {
      const cid = headers['x-amz-meta-cid'];
      console.log(`CID: ${cid}`);
      resolve(baseUrl + cid);
    });
});

exports.remove = async (bucket, name) => new Promise((resolve, reject) => {
    var params = {
        Bucket: bucket,
        Key: name,
    };
    const request = s3.deleteObject(params, function(error, data) {
        if (error) {
          console.error(error);
        } else {
          console.log('Remoção bem sucedida de arquivo - %s:%s\n%o', name, bucket, data);
          return baseUrl + data.ETag;
        }
    }).on('httpHeaders', (statusCode, headers) => {
      resolve();
    });
});