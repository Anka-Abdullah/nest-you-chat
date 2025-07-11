import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class MessagingService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MessagingService.name);
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  async onModuleInit() {
    await this.connectWithRetry();
  }

  async connectWithRetry(retries = 5, delayMs = 5000) {
    const url = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
    
    while (retries > 0) {
      try {
        this.connection = await amqp.connect(url);
        this.channel = await this.connection.createChannel();
        this.logger.log('Connected to RabbitMQ');
        return;
      } catch (err) {
        this.logger.warn(`RabbitMQ not ready. Retrying in ${delayMs / 1000}s... (${retries} retries left)`);
        retries--;
        
        if (retries > 0) {
          await new Promise((res) => setTimeout(res, delayMs));
        }
      }
    }
    
    throw new Error('Could not connect to RabbitMQ after all retry attempts');
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

  async consume(
    queue: string,
    onMessage: (msg: any) => Promise<void>,
  ) {
    if (!this.channel) {
      throw new Error('Channel is not initialized');
    }

    await this.channel.assertQueue(queue, { durable: false });
    this.channel.consume(queue, async (message: amqp.ConsumeMessage | null) => {
      if (!message) return;
      try {
        const payload = JSON.parse(message.content.toString());
        await onMessage(payload);
        this.channel!.ack(message);
      } catch (err) {
        this.logger.error('Failed to process message', err);
        this.channel!.nack(message, false, false);
      }
    });
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