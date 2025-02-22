import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  HttpCode,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
  Patch,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { InjectModel } from '@nestjs/mongoose';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { SignUpDto } from '../dto/signUP.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from '../dto/login.dto';
import { User } from '../userSchema/user.schema';
import { RoleDto } from '../dto/updateRoleUser';


@Controller('auth')
export class AuthControllerController {
  constructor(
    private readonly authService: AuthServiceService,
    private readonly jwtService: JwtService,
  ) { }
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    
     console.log(signUpDto)
    const existingUser = await this.authService.getUserByEmail(signUpDto.email);
    // console.log(existingUser)
    if (existingUser) {
      throw new HttpException(
        'Email address already in use',
        HttpStatus.CONFLICT,
      );
      // return res.json(new HttpException('Email address already in use', HttpStatus.CONFLICT))
    }

    const user = await this.authService.signUp(signUpDto);
    console.log(user);

    // return this.authService.signUp(signUpDto)
    const token = this.jwtService.sign({ id: existingUser });
    console.log(token);

    res.json(token); // res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge is the cookie expiration time in milliseconds (1 hour in this example)
    return { token,existingUser };

    // return res.json({ message: 'User registered successfully', token, user })

    // return { token }
  }

  @Post('/login/')

  async login(
    @Body() loginDto: loginDto,
    @Req() req: Request,
    @Res() res: Response,
    @Query() params:{lan:string,lg:string}
  ): Promise<User | any> {
    // console.log(loginDto)
    // console.log(params.lan)
    // console.log(params.lg)
    const user = await this.authService.login(loginDto);
    // console.log(user);
    // const authOk=await this.authService.isAuthenticated({email:loginDto.email})
    // console.log(authOk)
    // const token = this.jwtService.sign({ id:user._id })
    // console.log(token)
    // const decodedToken = jwt.verify(user.token, process.env.JWT_SECRET);
    // console.log(decodedToken) 
    
    // res.cookie('token', user.token); // maxAge is the cookie expiration time in milliseconds (1 hour in this example)
    res.json({ user });
  
  }
  @Patch('/user/addRole/:id')
  @UsePipes(new ValidationPipe())
  async updateRole(
    @Param('id') id: string,
    @Body() newRole: RoleDto,
    @Res() res: Response,
  ): Promise<User | any> {
    console.log(newRole);
    const RoleIsUpdate = await this.authService.updateRole(id, newRole);

    // console.log(RoleIsUpdate)
    return res.json({ role: RoleIsUpdate.Role[RoleIsUpdate.Role.length - 1] });
  }

  @Patch('/:id')
  async deleteRole(
    @Param('id') id: string,
    @Body() deleteRole: RoleDto,
    @Res() res: Response,
  ) {
    const isDel = await this.authService.deleteRole(id, deleteRole);
    console.log(isDel);
    return res.json({ us: isDel });
  }

  @Get('/getAuth/:id')
  async isAuthOk(@Param('id') id: string, @Res() res: Response) {
    const authOk = await this.authService.isAuthenticated(id);
    console.log(authOk);
    res.json(authOk);
  }
}
