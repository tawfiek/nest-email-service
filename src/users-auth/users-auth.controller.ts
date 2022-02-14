import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users-auth')
export class UsersAuthController {

  @MessagePattern('users.create')
  sendActivationEmail (@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response =
      ` #DEBUG Receiving a new message from topic: medium.rocks: ` + JSON.stringify(message);

    console.log(response);
    console.log('#DEBUG ', message);

    return response;
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