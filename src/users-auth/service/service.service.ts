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

            await this.mailgunClient.messages.create(this.MAILGUN_DOMAIN, messageData);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

      async sendWelcomeEmail(email: string, name: string): Promise<void> {
        try {
            const message = `
                Hello ${name}, welcome to our service.
                Your account has been activated successfully.

                Please login to our system.
            `;

            const messageData = {
                from: 'no-reply@dev.com',
                to: email,
                subject: 'Account activated',
                text: message,
            }

            await this.mailgunClient.messages.create(this.MAILGUN_DOMAIN, messageData);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}
