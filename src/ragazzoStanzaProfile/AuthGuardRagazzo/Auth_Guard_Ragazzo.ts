// // location.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// import { AuthServiceService } from 'src/AuthFile/auth-service/auth-service.service';
// import { PersoneeService } from '../personeeSERVICE/personee.service';


// @Injectable()
// export class LocationGuard implements CanActivate {
//   constructor(
//     private readonly authService: PersoneeService,
   
   
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Logged-in user
// console.log(user)
//     if (user && user.role === 'admin') {
//       // Get the expected admin location from your AuthService or configuration
//       const expectedAdminLocation = await this.authService.locationUser();

//       // Get the user's location from the request or wherever it's stored
//       const userLocation = request.body.location; // Replace with the actual location property

//       if (userLocation === expectedAdminLocation) {
//         return true; // User's location matches admin's location
//       }
//     }

//     return false; // User's location doesn't match or not an admin
//   }
// }
