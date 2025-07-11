
 import { Injectable, OnModuleInit } from '@nestjs/common';
 import { MessagingService } from '../messaging/messaging.service';
 import { ChatGateway } from './chat.gateway';
 
 @Injectable()
 export class ChatProcessor implements OnModuleInit {
   constructor(
     private readonly messaging: MessagingService,
     private readonly gateway: ChatGateway,
   ) {}
 
   async onModuleInit() {
     await this.messaging.consume('chat_messages', async (payload) => {
      this.gateway.sendPrivateMessage(payload.receiverId, {
        from: payload.senderId,
        text: payload.text,
         type: 'private',
        id: payload.messageId,
       });
     });
   }
 }
