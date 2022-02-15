import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceService } from './service/service.service';

@Controller('users-auth')
export class UsersAuthController {

  constructor(private readonly service: ServiceService) {}

  @MessagePattern('users.create')
  async sendActivationEmail (@Payload() message: any) {
    const { email, activationUUID } = message.value;

    console.log('#DEBUG ', message.value);

    await this.service.sendVerificationEmail(email, activationUUID);

    return message.value;
  }


  @MessagePattern('users.activated')
  sendWelcomeEmail (@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
      ` #DEBUG Receiving a new message from topic: medium.rocks: ` + JSON.stringify(message);

    console.log(response);
    console.log('#DEBUG ', message);

    return response;
  }
}