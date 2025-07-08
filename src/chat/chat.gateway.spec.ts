 import { Test, TestingModule } from '@nestjs/testing';
 import { ChatGateway } from './chat.gateway';
import { Server } from 'socket.io';
 
 describe('ChatGateway', () => {
   let gateway: ChatGateway;
 
   beforeEach(async () => {
     const module: TestingModule = await Test.createTestingModule({
       providers: [ChatGateway],
     }).compile();
 
     gateway = module.get<ChatGateway>(ChatGateway);
   });
 
   it('should be defined', () => {
     expect(gateway).toBeDefined();
   });

  it('should emit message to all clients', () => {
    const emit = jest.fn();
    gateway.server = { emit } as unknown as Server;
    gateway.handleMessage({ id: '123' } as any, 'hello');
    expect(emit).toHaveBeenCalledWith('message', {
      clientId: '123',
      text: 'hello',
    });
  });
 });
