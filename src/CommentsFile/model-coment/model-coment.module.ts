import { Module } from '@nestjs/common';
import { ComentserviceService } from '../comentservice/comentservice.service';
import { ComentController } from '../coment/coment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchemas } from '../SchemasComment/comment/comment';
import { AuthModuleModule } from 'src/AuthFile/auth-module/auth-module.module';


@Module({
    imports: [
        AuthModuleModule,

        MongooseModule.forFeature([
            { name: 'commentaire', schema: CommentSchemas }
        ]),
    ],

    controllers: [ComentController],
    providers: [ComentserviceService],
})
export class ModelComentModule { }
