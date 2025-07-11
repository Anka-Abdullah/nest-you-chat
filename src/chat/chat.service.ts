import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
 import { Model } from 'mongoose';
import { MessagingService } from '../messaging/messaging.service';
import { Message, MessageDocument } from './schemas/message.schema';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
  
  @Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private msgModel: Model<MessageDocument>,
    @InjectModel(Conversation.name) private convModel: Model<ConversationDocument>,
    private readonly messaging: MessagingService,
  ) {}

  async sendMessage(from: string, to: string, content: string) {
    const [userA, userB] = [from, to].sort();
    let conversation = await this.convModel.findOne({ userA, userB });

    const sentAt = new Date();

    if (!conversation) {
      conversation = await this.convModel.create({
        userA,
        userB,
        lastMessage: { text: content, sentAt, senderId: from },
      });
    }

    const message = await this.msgModel.create({
      conversationId: conversation._id,
      senderId: from,
      receiverId: to,
      text: content,
      attachments: [],
      status: 'sent',
      sentAt,
    });

    conversation.lastMessage = { text: content, sentAt, senderId: from };
    conversation.updatedAt = sentAt;
    await conversation.save();

    await this.messaging.publish('chat_messages', {
      messageId: String(message._id),
      conversationId: String(conversation._id),
      senderId: from,
      receiverId: to,
      text: content,
    });

    return message;
  }

  async getMessages(userA: string, userB: string) {
    const [a, b] = [userA, userB].sort();
    const conversation = await this.convModel.findOne({ userA: a, userB: b });
    if (!conversation) {
      return [];
    }
    return this.msgModel
      .find({ conversationId: conversation._id })
      .sort({ sentAt: 1 })
      .exec();
  }
}
