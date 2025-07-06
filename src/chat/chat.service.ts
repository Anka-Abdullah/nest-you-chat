 import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { MessagingService } from '../messaging/messaging.service';
 
 @Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private msgModel: Model<MessageDocument>,
    private messaging: MessagingService,
  ) {}

  async sendMessage(from: string, to: string, content: string) {
    const message = new this.msgModel({
      from: new Types.ObjectId(from),
      to: new Types.ObjectId(to),
      content,
    });
    await message.save();
    await this.messaging.publish('chat_messages', {
      to,
      from,
      content,
      id: message._id,
    });
    return message;
  }

  async getMessages(userA: string, userB: string) {
    return this.msgModel
      .find({
        $or: [
          { from: userA, to: userB },
          { from: userB, to: userA },
        ],
      })
      .sort({ createdAt: 1 })
      .exec();
  }
}
