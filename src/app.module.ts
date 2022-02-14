import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersAuthController } from './users-auth/users-auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_MODULE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth_producer',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'dev_task_auth_consumer',
          },
        },
      },
    ]),
    ConfigModule.forRoot({envFilePath: '.env'}),],
  controllers: [AppController, UsersAuthController],
  providers: [AppService],
})
export class AppModule {}
