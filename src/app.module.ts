import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModuleModule } from './AuthFile/auth-module/auth-module.module';
import { SignUpDto } from './AuthFile/dto/signUP.dto';
import { HelmetService } from './helmet/helmet.service';
import { ModelComentModule } from './CommentsFile/model-coment/model-coment.module';
import { ModemModelModule } from './Modem/modem-model/modem-model.module';

const dotenv = require('dotenv')
dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_LIEN),
    AuthModuleModule,
    ModelComentModule,
    ModemModelModule,
   
    // SignUpDto
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
