import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  zodiac?: string;

  @Prop()
  horoscope?: string;

  @Prop()
  height?: number; // in cm

  @Prop()
  weight?: number; // in kg

  @Prop({ enum: ['male', 'female', 'other'] })
  gender?: string;

  @Prop()
  about?: string;

  @Prop([String])
  interest?: string[];

  @Prop()
  image?: string; // base64 string
}

export const UserSchema = SchemaFactory.createForClass(User);
