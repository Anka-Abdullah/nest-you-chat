import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessagingService } from '../messaging/messaging.service';
import { ChatGateway } from './chat.gateway';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatProcessor implements OnModuleInit {
  constructor(
    private readonly messaging: MessagingService,
    @InjectModel(Message.name) private readonly msgModel: Model<MessageDocument>,
    private readonly gateway: ChatGateway,
  ) {}

  async onModuleInit() {
    await this.messaging.consume('chat_messages', async (payload) => {
      const message = new this.msgModel({
        from: new Types.ObjectId(payload.from),
        to: new Types.ObjectId(payload.to),
        content: payload.content,
      });
      await message.save();
      this.gateway.sendPrivateMessage(payload.to, {
        from: payload.from,
        text: payload.content,
        type: 'private',
        id: String(message._id),
      });
    });
  }
}
