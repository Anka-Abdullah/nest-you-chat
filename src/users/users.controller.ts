import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { User } from './schemas/user.schema';
import { Request } from 'express';
import { Req } from '@nestjs/common';
 
@Controller()
export class UsersController {
  constructor(private usersService: UsersService, private jwt: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Put('createProfile')
  async createProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req['user'] as User;
    return this.usersService.updateProfile(String(user._id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  async updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req['user'] as User;
    return this.usersService.updateProfile(String(user._id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Req() req: Request) {
    const user = req['user'] as User;
    return this.usersService.findById(String(user._id));
  }
}
