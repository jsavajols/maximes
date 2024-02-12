// @ts-nocheck
import { Body, render } from 'svelte-email';
import Welcome from './template-maxime.svelte';
import TemplateMaxime from './template-maxime.svelte';
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';
import { SCALEWAY_PASS } from '$env/static/private';
import { SCALEWAY_USER } from '$env/static/private';
import { OVH_MAIL_USER } from '$env/static/private';
import { OVH_MAIL_PASS } from '$env/static/private';

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
        /*
        host: 'smtp.tem.scw.cloud',
        port: 587,
        secure: false,
        auth: {
            user: SCALEWAY_USER,
            pass: SCALEWAY_PASS
        }
        */
        
        host: 'ssl0.ovh.net',
        port: 587,
        secure: false,
        auth: {
            user: OVH_MAIL_USER,
            pass: OVH_MAIL_PASS
        }
        
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
        from: 'admin@1clusif.org',
        to: 'jsavajols@gmail.com',
        subject: 'Voici votre maxime du jour',
        html: emailHtml,
        text: 'Voici votre maxime du jour',
    };


    transporter.sendMail(options, (err=null, info='') => {
        if (err) {
            return (json(err));
        } else {
            return (json(info));
        }
    });
    return (json({}));
}

