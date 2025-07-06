 import { Injectable, UnauthorizedException } from '@nestjs/common';
 import { JwtService } from '@nestjs/jwt';
 import { UsersService } from '../users/users.service';
 import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
 export class AuthService {
   constructor(
     private usersService: UsersService,
     private jwtService: JwtService,
   ) {}
 
  async register(data: RegisterDto): Promise<UserDocument> {
     return this.usersService.create(data);
   }
 
  async validateUser(email: string, pass: string): Promise<UserDocument> {
     const user = await this.usersService.findByEmail(email);
     if (user && (await bcrypt.compare(pass, user.password))) {
       return user;
     }
     throw new UnauthorizedException();
   }
 
  async login(user: UserDocument) {
     const payload = { sub: String(user._id), username: user.username };
     return {
       access_token: this.jwtService.sign(payload),
     };
   }
 }
