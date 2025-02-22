import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from './roles.emu';
import { ROLES_KEY } from './roles.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../userSchema/user.schema';
import { AuthServiceService } from '../auth-service/auth-service.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // private user: AuthServiceService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(context)
    // console.log(context.getClass())
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true; // No role specified, access allowed
    }
    // console.log(context.switchToHttp().getRequest())
    const { user } = context.switchToHttp().getRequest();
    console.log(user.user._id);

    return requiredRoles.some((role) => user.user.Role?.includes(role));
  }
}
