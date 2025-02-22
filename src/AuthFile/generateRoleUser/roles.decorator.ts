

import { SetMetadata } from '@nestjs/common';
import { Roles } from './roles.emu';



export const ROLES_KEY = 'roles';
export const Rol = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);