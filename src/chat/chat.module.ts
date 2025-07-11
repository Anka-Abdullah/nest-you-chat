import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MessagingModule } from '../messaging/messaging.module';
import { ChatProcessor } from './chat.processor';
import { Message, MessageSchema } from './schemas/message.schema';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    MessagingModule,
  ],
  providers: [ChatService, ChatGateway, ChatProcessor],
  controllers: [ChatController],
})
export class ChatModule {}
