import { Body, render } from 'svelte-email';
import Welcome from './template-maxime.svelte';
import TemplateMaxime from './template-maxime.svelte';
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { SCALEWAY_PASS, SCALEWAY_USER } from '$env/static/private';

let mailTemplate = Welcome;

export const POST = async ({ request }) => {
    const data = await request.json();
    switch (data.mailTemplate) {
        case 'welcome':
            mailTemplate = Welcome;
            break;
        case 'template-maxime':
            mailTemplate = TemplateMaxime;
            break;
        default:
            mailTemplate = Welcome;
    }
    const transporter = nodemailer.createTransport({
        
        host: 'smtp.tem.scw.cloud',
        port: 587,
        secure: false,
        auth: {
            user: SCALEWAY_USER,
            pass: SCALEWAY_PASS
        }
        
        /*
        ignoreTLS: true,
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        sender: '1clusif.org',  
        auth: {
            user: 'jsavajols@gmail.com',
            pass: '****************'
        }
        */
        /*
        host: 'ssl0.ovh.net',
        port: 587,
        secure: false,
        auth: {
            user: 'jerome@1clusif.org',
            pass: '#Jerome0562'
        }
        */
    });

    const emailHtml = render({
        template: mailTemplate,
        props: {
            name: data.to,
            author: data.author,
            maxime: data.maxime,
        }
    });

    const options = {
        from: 'jerome@1clusif.org',
        to: 'jsavajols@gmail.com',
        subject: 'Voici votre maxime du jour',
        html: emailHtml,
        text: 'Voici votre maxime du jour',
    };


    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return (json(err));
        } else {
            return (json(info));
        }
    });
    return (json({}));
}

