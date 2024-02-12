// @ts-nocheck
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { json } from '@sveltejs/kit'
import { uploadToS3, downloadFromS3 } from '$lib/s3/s3.js';

export const POST = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('audio');
    let filename
    try {
        if (file) {
            const ext = file.name.split('.').pop()
            filename = 'audio' + '-' + Date.now().toString() + '.' + ext
            // filename = 'audio' + '.' + ext
            let ab = await file.arrayBuffer()
            writeFileSync(`uploads/${filename}`, Buffer.from(ab, (e) => {
                console.log(e)
            }))
            // send to S3
            await uploadToS3('audioshare', `uploads/${filename}`);

            return json({ filename: `uploads/${filename}` });
        }
    } catch (e) {
        console.log(e);
        return json({ success: false });

    }
}

export const GET = async ({ url }) => {
    let fileIn = url.searchParams.get('filename');
    let fromS3 = url.searchParams.get('fromS3');
    if (fromS3) {
        await downloadFromS3('audioshare', fileIn, fileIn);
    }
    const out = await readFileSync(fileIn);
    unlinkSync(fileIn);
    return new Response(out, {
        headers: {
            "Content-Type": "audio/ogg",
            "Content-Disposition": "attachment; filename=" + fileIn
        }
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms ?? 200));
  }

