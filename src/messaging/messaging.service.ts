import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';
 
 @Injectable()
export class MessagingService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit() {
    const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    this.connection = await connect(url);
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, msg: any) {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
