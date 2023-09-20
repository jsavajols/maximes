// @ts-nocheck

import { Client } from 'minio';

const minioClient = new Client({
    endPoint: 's3.gra.io.cloud.ovh.net',
    region: 'gra',
    accessKey: '81c49a502cf24df6a7c645aab4e61f0c',
    secretKey: '5bb77d9fc5734964a284e8ac007f1adc'
});

const bucketName = 'audioshare';

export async function uploadToS3(bucketName, fileName) {
    var metaData = {
        'Content-Type': 'application/octet-stream',
    }
    minioClient.fPutObject(bucketName, fileName, fileName, metaData, function (err, etag) {
        if (err) return console.log(err)
    });
}

export async function downloadFromS3(bucketName, fileName, destFileName) {
    return new Promise(async function (resolve, reject) {
        await minioClient.fGetObject(bucketName, fileName, destFileName, function (err) {
            if (err) {
                reject (err)
            } else {
                resolve(true);
            }
        });
    });
}