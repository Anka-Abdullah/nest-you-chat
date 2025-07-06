import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { getZodiac } from './utils/zodiac';
import { getHoroscope } from './utils/horoscope';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: CreateUserDto): Promise<UserDocument> {
    const hashed = await bcrypt.hash(data.password, 10);
    const birth = new Date(data.birthDate);
    const zodiac = getZodiac(birth);
    const horoscope = getHoroscope(zodiac);
    const created = new this.userModel({
      ...data,
      birthDate: birth,
      password: hashed,
      zodiac,
      horoscope,
    });
    return created.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async updateProfile(
    id: string,
    payload: Partial<UpdateUserDto>,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    const updates: Partial<User> = { ...payload } as Partial<User>;
    if (payload.birthDate) {
      const birth = new Date(payload.birthDate);
      const zodiac = getZodiac(birth);
      updates.birthDate = birth;
      updates.zodiac = zodiac;
      updates.horoscope = getHoroscope(zodiac);
    }
    Object.assign(user, updates);
    return user.save();
  }
}
