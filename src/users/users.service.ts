
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { getZodiac } from './utils/zodiac';
import { getHoroscope } from './utils/horoscope';
 
 @Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<User> {
    const hashed = await bcrypt.hash(data.password, 10);
    const birth = new Date(data.birthDate);
    const zodiac = getZodiac(birth);
    const horoscope = getHoroscope(zodiac);
    const created = new this.userModel({
      ...data,
      password: hashed,
      zodiac,
      horoscope,
    });
    return created.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateProfile(id: string, payload: Partial<User>): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    if (payload.birthDate) {
      const zodiac = getZodiac(new Date(payload.birthDate));
      payload.zodiac = zodiac;
      payload.horoscope = getHoroscope(zodiac);
    }
    Object.assign(user, payload);
    return user.save();
  }
}
