// @ts-nocheck
import { fstat, writeFileSync } from 'fs';
import { json } from '@sveltejs/kit'

export const GET = async () => {

    return json({ message: 'GET' })
}

export const POST = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('audio');
    let filename
    try {
        if (file) {
            const ext = file.name.split('.').pop()
            filename = 'audio' + '-' + Date.now().toString() + '.' + ext           
            let ab = await file.arrayBuffer()
            console.log(Array.from(ab));
            writeFileSync(`static/sounds/${filename}`, Buffer.from(ab, (e) => {
                console.log(e)
            }))
            return json({ filename: `/sounds/${filename}` });
        }
    } catch (e) {
        console.log(e);
        return json({ success: false });

    }

}