 import { Module } from '@nestjs/common';
 import { MongooseModule } from '@nestjs/mongoose';
 import { ChatService } from './chat.service';
 import { ChatController } from './chat.controller';
 import { ChatGateway } from './chat.gateway';
 import { Message, MessageSchema } from './schemas/message.schema';
 import { MessagingModule } from '../messaging/messaging.module';
import { ChatProcessor } from './chat.processor';
 
 @Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MessagingModule,
  ],
  providers: [ChatService, ChatGateway, ChatProcessor],
   controllers: [ChatController],
 })
 export class ChatModule {}
