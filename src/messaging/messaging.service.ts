import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class MessagingService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MessagingService.name);
  private connection: any = null;
  private channel: any = null;

  async onModuleInit() {
    try {
      const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
      this.connection = await connect(url);
      this.channel = await this.connection.createChannel();
      this.logger.log('Connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  async publish(queue: string, msg: any) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }

    try {
      await this.channel.assertQueue(queue, { durable: false });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
      this.logger.debug(`Message published to queue: ${queue}`);
    } catch (error) {
      this.logger.error(`Failed to publish message to queue: ${queue}`, error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      if (this.channel) {
        await this.channel.close();
        this.logger.log('Channel closed');
      }
      if (this.connection) {
        await this.connection.close();
        this.logger.log('Connection closed');
      }
    } catch (error) {
      this.logger.error('Error during cleanup', error);
    }
  }
}
