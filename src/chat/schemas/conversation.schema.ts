import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true })
  conversationId: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ required: true })
  text: string;

  @Prop([String])
  attachments: string[];

  @Prop({ enum: ['sent', 'delivered', 'read'], default: 'sent' })
  status: string;

  @Prop({ required: true })
  sentAt: Date;

  @Prop()
  readAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({
    type: Object,
    required: true,
    default: {
      text: '',
      sentAt: new Date(),
      senderId: null,
    },
  })
  lastMessage: {
    text: string;
    sentAt: Date;
    senderId: string;
  };
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
