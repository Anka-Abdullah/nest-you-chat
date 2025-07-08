import { Body, Controller, Get, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdateImageDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { UserDocument } from './schemas/user.schema';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('createProfile')
  async createProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req['user'] as UserDocument;
    return this.usersService.updateProfile(String(user._id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  async updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req['user'] as UserDocument;
    return this.usersService.updateProfile(String(user._id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Req() req: Request) {
    const user = req['user'] as UserDocument;
    return this.usersService.findById(String(user._id));
  }

  @Get('all-user')
  async allUser(@Req() req: Request) {
    const user = req['user'] as UserDocument;
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateImage')
  async updateImage(@Req() req: Request, @Body() dto: UpdateImageDto) {
    const user = req['user'] as UserDocument;
    return this.usersService.updateImage(String(user._id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getImage')
  async getImage(@Req() req: Request) {
    const user = req['user'] as UserDocument;
    return this.usersService.getUserImage(String(user._id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteImage')
  async deleteImage(@Req() req: Request) {
    const user = req['user'] as UserDocument;
    return this.usersService.deleteImage(String(user._id));
  }

  @Get('user/:id/image')
  async getUserImageById(@Param('id') id: string) {
    return this.usersService.getUserImage(id);
  }
}
