 import { Injectable } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
 
 @Injectable()
 export class ChatService {
   constructor(
     @InjectModel(Message.name) private msgModel: Model<MessageDocument>,
   ) {}
 
   async sendMessage(from: string, to: string, content: string) {
     
    return { from, to, content };
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
