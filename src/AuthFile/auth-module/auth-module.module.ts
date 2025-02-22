import { Module } from '@nestjs/common';
import { AuthControllerController } from '../auth-controller/auth-controller.controller';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../userSchema/user.schema';
import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { IsUniqueEmailValidator } from '../unique-email/unique-email.service';
import { JwtStrategy } from '../jwt.stratigy.secure';
import { JwtModule } from '@nestjs/jwt';
import { CONSTANTE } from 'src/ragazzoStanzaProfile/personeeSERVICE/Constante';
import { EncryptionService } from 'src/ragazzoStanzaProfile/CryptageData/Crpt.data';
import { SchemaPersonelValentano } from 'src/ragazzoStanzaProfile/SECHEMA.PERSONNE.VALENTANO';
import { SchamaPresence } from 'src/ragazzoStanzaProfile/TABLEAU.PRESENCE';
import { PersoneeService } from 'src/ragazzoStanzaProfile/personeeSERVICE/personee.service';
import { PersonneControllerController } from 'src/ragazzoStanzaProfile/personne-controller/personne-controller.controller';
// import { RoleAuthGuard } from '../generateRoleUser/roles.AuthGuard';
// import { SchemaPersonelValentano } from 'src/ragazzoStanzaProfile/SECHEMA.PERSONNE.VALENTANO';
// import { SchamaPresence } from 'src/ragazzoStanzaProfile/TABLEAU.PRESENCE';
// import { PersoneeService } from 'src/ragazzoStanzaProfile/personeeSERVICE/personee.service';
// import { PersonneControllerController } from 'src/ragazzoStanzaProfile/personne-controller/personne-controller.controller';
// import { EncryptionService } from 'src/ragazzoStanzaProfile/CryptageData/Crpt.data';
// import { CONSTANTE } from 'src/ragazzoStanzaProfile/personeeSERVICE/Constante';

dotenv.config();
console.log(ConfigService);
@Module({
  imports: [
    // ConfigModule.forRoot({ envFilePath: `${process.env.JWT_SECRET}.env` }),
    // ConfigModule,
    // JwtStrategy,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      //config service
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get('JWT_EXPIRES'));

        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
          // secretOrPrivateKey: config.jwtSecret,
        };
      },
    }),
    
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'personneValentano', schema: SchemaPersonelValentano },
      { name: 'presence', schema: SchamaPresence },
    ]),
  ],

  controllers: [AuthControllerController,PersonneControllerController],
  providers: [AuthServiceService, JwtStrategy,PersoneeService,CONSTANTE,EncryptionService],
  exports: [PassportModule],
})
export class AuthModuleModule { }
