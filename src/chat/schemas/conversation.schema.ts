import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true })
  userA: string; // User A (sender)

  @Prop({ required: true })
  userB: string; // User B (receiver)

  @Prop({
    type: Object,
    required: true,
    default: {
      text: '',
      sentAt: new Date(),
      senderId: null,
    }
  })
  lastMessage: {
    text: string;
    sentAt: Date;
    senderId: string;
  };
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
