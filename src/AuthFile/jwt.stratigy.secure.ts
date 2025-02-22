import { Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './userSchema/user.schema';
import { AuthServiceService } from './auth-service/auth-service.service';
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.JWT_SECRET)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectModel('user')
    // private userModel: Model<User>,
    private readonly userServ: AuthServiceService,
  
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any | undefined> {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    console.log(isEmail)
    console.log(payload)
    if (isEmail === true) {

      const user = await this.userServ.login({ email: payload.email, password: payload.password });
      console.log(user)


      if (!user) {
        throw new UnauthorizedException('Login first to access this endpoint.');
      }

      return user;
    }
    //  else {
    //   const user = await this.personneService.loginPersonne({ email: payload.email, password: payload.password }, { params: payload.params });

    //   console.log(user)

    //   if (!user) {
    //     throw new UnauthorizedException('Login first to access this endpoint.');
    //   }

    //   return user;
    // }
  }
}
