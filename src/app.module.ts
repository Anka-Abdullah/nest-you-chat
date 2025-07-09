import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { MessagingModule } from './messaging/messaging.module';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers:[AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    MongooseModule.forRoot(
      (() => {
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
          throw new Error('❌ DATABASE_URL is missing!\n');
        }

        return databaseUrl;
      })(),
    ),
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // Your RabbitMQ URL
          queue: 'chat_queue', // Queue name
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    CommonModule,
    UsersModule,
    AuthModule,
    ChatModule,
    MessagingModule,
  ],
})
export class AppModule {}
