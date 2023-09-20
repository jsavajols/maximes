// @ts-nocheck
import { Client } from 'minio';

const minioClient = new Client({
    endPoint: 's3.gra.io.cloud.ovh.net',
    region: 'gra',
    accessKey: '81c49a502cf24df6a7c645aab4e61f0c',
    secretKey: '5bb77d9fc5734964a284e8ac007f1adc'
});

const bucketName = 'audioshare';
const fileName = 'uploads/audio-1695227228599.ogg';

var metaData = {
  'Content-Type': 'application/octet-stream',
}

/*
minioClient.fPutObject(bucketName, fileName, fileName, metaData, function (err, etag) {
  if (err) return console.log(err)
  console.log('File uploaded successfully.')
})
*/


minioClient.fGetObject(bucketName, fileName, 'test.ogg',  function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('File downloaded successfully.')
})

