import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceService } from './service/service.service';

@Controller('users-auth')
export class UsersAuthController {

  constructor(private readonly service: ServiceService) {}

  @MessagePattern('users.create')
  async sendActivationEmail (@Payload() message: any) {
    try {
      const { email, activationUUID } = message.value;

      await this.service.sendVerificationEmail(email, activationUUID);

      return message.value;
    } catch (e) {
      throw e;
    }
  }


  @MessagePattern('users.activated')
  async sendWelcomeEmail (@Payload() message: any, @Ctx() context: KafkaContext) {
    try {
      const { email, firstName } = message.value;

      await this.service.sendWelcomeEmail(email, firstName);

      return message.value;
    } catch (e) {
      throw e;
    }
  }
}