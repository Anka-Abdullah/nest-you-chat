 import {
   SubscribeMessage,
   WebSocketGateway,
   WebSocketServer,
   ConnectedSocket,
   MessageBody,
   OnGatewayConnection,
   OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
 
 @WebSocketGateway({
   cors: {
     origin: "*",
     methods: ["GET", "POST"],
     credentials: true
   },
   transports: ['websocket'],
   pingTimeout: 60000,
   pingInterval: 25000,
   connectTimeout: 45000,
   allowEIO3: false
 })
 export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
   @WebSocketServer()
   server: Server;
 
   private clients = new Map<string, string>();
 
  constructor(private readonly chatService: ChatService) {}

   handleConnection(client: Socket) {
     console.log('Client connected:', client.id);
     const userId = client.handshake.query['userId'];
     if (typeof userId === 'string') {
       this.clients.set(userId, client.id);
       client.data.userId = userId;
       console.log('User registered:', userId);
       
       // Send welcome message
       client.emit('connected', { message: 'Connected successfully', userId });
     }
 
     // Handle disconnect reason
     client.on('disconnect', (reason) => {
       console.log('Client disconnected:', client.id, 'Reason:', reason);
       if (client.data.userId) {
         this.clients.delete(client.data.userId);
       }
     });
   }
 
   @SubscribeMessage('private')
   handlePrivate(
     @ConnectedSocket() client: Socket,
     @MessageBody() payload: { to: string; message: string },
   ) {
     console.log('Private message:', payload);
    const sender = client.data.userId ?? client.id;
    this.chatService.sendMessage(sender, payload.to, payload.message);
    client.emit('message', {
      from: sender,
      text: payload.message,
      type: 'private',
    });
   }
 
   handleDisconnect(client: Socket) {
     console.log('Client disconnected:', client.id);
     if (client.data.userId) {
       this.clients.delete(client.data.userId);
     }
   }

  getClientId(userId: string): string | undefined {
    return this.clients.get(userId);
  }

  sendPrivateMessage(userId: string, message: any) {
    const clientId = this.clients.get(userId);
    if (clientId) {
      this.server.to(clientId).emit('message', message);
    }
  }
 }
