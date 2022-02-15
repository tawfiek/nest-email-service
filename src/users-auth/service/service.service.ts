import { Injectable } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import formData from 'form-data'

@Injectable()
export class ServiceService {
    MAILGUN_API_PRIVATE_KEY = process.env.MAILGUN_API_PRIVATE_KEY;
    MAILGUN_API_PUBLIC_KEY = process.env.MAILGUN_API_PUBLIC_KEY;
    MAILGUN_USERNAME = process.env.MAILGUN_USERNAME;
    MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
    ACTIVATE_URL = process.env.ACTIVATE_URL;

    mailgun = new Mailgun(formData);
    mailgunClient = this.mailgun.client({
        username: this.MAILGUN_USERNAME,
        key: this.MAILGUN_API_PRIVATE_KEY,
        public_key: this.MAILGUN_API_PUBLIC_KEY,
    });


    constructor () { }


    async sendVerificationEmail(email: string, token: string): Promise<void> {
        try {
            console.log('#DEBUG ', email, token);
            
            const activationURL = `${this.ACTIVATE_URL}/${token}`;
            const message = `
                Hello, welcome to our service please activate your account using this link:
                ${activationURL}
            `;

            const messageData = {
                from: 'no-reply@dev.com',
                to: email,
                subject: 'Welcome to our system',
                text: message,
            }

            const result  =await this.mailgunClient.messages.create(this.MAILGUN_DOMAIN, messageData);
            console.log('#DEBUG ', result);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
