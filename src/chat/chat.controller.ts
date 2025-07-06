
import { Body, Controller, Get, Post, Query, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { Request } from 'express';
import { SendMessageDto } from './dto/send-message.dto';
 
@Controller()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  async sendMessage(
    @Req() req: Request,
    @Body() dto: SendMessageDto,
  ) {
    const user = req['user'];
    return this.chatService.sendMessage(String(user._id), dto.to, dto.message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  async viewMessages(
    @Req() req: Request,
    @Query('user') otherId: string,
  ) {
    const user = req['user'];
    return this.chatService.getMessages(String(user._id), otherId);
  }
}
