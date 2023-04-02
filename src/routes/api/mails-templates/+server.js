import { render } from 'svelte-email';
import Welcome from './welcome.svelte';
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit'

const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 587,
    secure: false,
    auth: {
        user: 'jerome@1clusif.org',
        pass: '#Jerome0562'
    }
});

const emailHtml = render({
    template: Welcome,
    props: {
        name: 'Svelte'
    }
});

const options = {
    from: 'jerome@1clusif.org',
    to: 'jsavajols@gmail.com',
    subject: 'hello world',
    html: emailHtml
};


export const POST = async () => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
                reject(json(err));
            } else {
                console.log(info);
                resolve(json(info));
            }
        });
    });
}

