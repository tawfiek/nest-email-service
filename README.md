# Mailer Service
## Description

This application acts like an MQTT consumer that connects to a Kafka broker to send emails using Mailgun as an email service.
## Application Functionality

This service listen on two topics on Kafka server to send to types of emails, activation email, which will have a link to the auth service to access and activate his email.

And a welcoming email that sent to the user as a side effect to the activation process.

## Dependencies

1. Mailgun:
  This is an external mailing service that we use for sending emails to the usr.

2. Kafka MQTT broker that should this service connect to.

You can find all the configuration required in `.example.env` file that needs to be copied to `.env` file in the root directory of the application.

> NOTE: The API key for mail gun in the `.example.env` file will not be able to send any emails to any addresses but owen personal email address, other with you will get 403 `Forbidden` response.
 please add your own Mailgun credentials and Domain.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Multi stage docker file added here so you can use docker to run the application for both development and production proposes

## Messages

### users.created
Here we should get the users data, build an activation URL.
Then send this URL to the user's email.
### users.activated
After user activation done we should get this message with the user's info from the authentication service and then send an welcoming email to the user.
