'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});

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
          console.log('Successfully uploaded %s file %s:%s\n%o', fileType, name, bucket, data);
          return 'https://deaf-gold-mandrill.myfilebase.com/ipfs/' + data.ETag;
        }
    }).on('httpHeaders', (statusCode, headers) => {
      const cid = headers['x-amz-meta-cid'];
      console.log(`CID: ${cid}`);
      resolve('https://deaf-gold-mandrill.myfilebase.com/ipfs/' + cid);
    });
});