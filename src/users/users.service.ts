import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { getZodiac } from './utils/zodiac';
import { getHoroscope } from './utils/horoscope';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateImageDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: CreateUserDto): Promise<UserDocument> {
    const hashed = await bcrypt.hash(data.password, 10);
    const created = new this.userModel({
      ...data,
      password: hashed,
    });
    return created.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async updateProfile(id: string, payload: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updates: Partial<User> = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined),
    );

    if (payload.password) {
      updates.password = await bcrypt.hash(payload.password, 10);
    }

    if (payload.birthDate) {
      updates.birthDate = payload.birthDate;
      updates.zodiac = getZodiac(payload.birthDate);
      updates.horoscope = getHoroscope(payload.birthDate);
    }

    Object.assign(user, updates);
    return user.save();
  }

  async updateImage(id: string, payload: UpdateImageDto): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (!this.isValidBase64Image(payload.image)) {
      throw new BadRequestException('Invalid base64 image format');
    }

    user.image = payload.image;
    return user.save();
  }

  async getUserImage(id: string): Promise<{ image: string }> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (!user.image) {
      throw new NotFoundException('User image not found');
    }

    return { image: user.image };
  }

  async deleteImage(id: string): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (!user.image) {
      throw new NotFoundException('User image not found');
    }

    user.image = undefined;
    await user.save();

    return { message: 'Image deleted successfully' };
  }

  private isValidBase64Image(base64String: string): boolean {
    // Check if it's a valid base64 string with image data URI
    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
    return base64Pattern.test(base64String);
  }
}
