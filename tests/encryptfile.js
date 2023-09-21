// @ts-nocheck
import crypto from 'crypto';
import fs from 'fs';

async function encryptFile(filePath) {
    const algorithm = 'aes-256-gcm';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(`${filePath}.enc`);

    input.pipe(cipher).pipe(output);

    return { key, iv };
}

async function decryptFile(filePath, key, iv) {
    const algorithm = 'aes-256-gcm';
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
  
    const input = fs.createReadStream(`${filePath}.enc`);
    const output = fs.createWriteStream(`${filePath}.dec`);

    input.pipe(decipher).pipe(output);

  }


async function main() {
    let {key, iv} = await encryptFile('crud.js');
    // console.log(await encryptFile('crud.js'));
    await decryptFile('crud.js', key, iv);
}

main();
