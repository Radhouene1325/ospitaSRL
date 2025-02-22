import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

import { Body, Inject, Injectable } from '@nestjs/common';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { SignUpDto } from '../dto/signUP.dto';

@Injectable()
@ValidatorConstraint({ name: 'isUniqueEmail', async: true })
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(@Inject(AuthServiceService) private readonly authService: AuthServiceService) {
    console.log(this.authService)
  }

  async validate(signUpDto: SignUpDto, args: ValidationArguments) {
    const user = await this.authService.getUserByEmail(signUpDto.email);
    return !user; // Return true if email is unique (user not found)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email address already in use'; // Error message when email is not unique
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailValidator,
    });
  };
}
// UniqueEmailService