import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HelmetService } from './helmet/helmet.service';
import helmet from 'helmet'
import * as csurf from 'csurf';
import { ExpressAdapter } from '@nestjs/platform-express';
import  express from 'express';
var cors = require('cors')
async function bootstrap() {
  const server = express()
  const app = await NestFactory.create(AppModule,new ExpressAdapter(server),);

  app.useGlobalPipes(new ValidationPipe());

  // app.use(helmet({
  //   crossOriginEmbedderPolicy: false,
  //   contentSecurityPolicy: {
  //     directives: {
  //       imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  //       manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
  //       frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
  //     },
  //   },
  // }));
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true 
  }))
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.getHttpAdapter()))
  app.enableCors({
    origin: '*',
    methods: ['Get','Post', 'Patch', 'Delete', 'Put'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true
  });
  // app.use(cors({
  //   origin: 'http://localhost:5000',
  //   credentials: true
  // }))
  // app.use((req, res, next) => {
  //   req.rawBody = '';
  //   req.setEncoding('utf8');
  //   req.on('data', (chunk) => (req.rawBody += chunk));
  //   req.on('end', next);
  // });  
  await app.listen(5000);
  console.log(5000)
}
bootstrap();
