import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ComentserviceService } from '../comentservice/comentservice.service';
import { ValideComent } from '../ValidateComment/validationComment';
import { Comment } from '../SchemasComment/comment/comment';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RoleAuthGuard } from '../../AuthFile/generateRoleUser/roles.AuthGuard';
import { Rol } from '../../AuthFile/generateRoleUser/roles.decorator';
import { Roles as UserRoles } from '../../AuthFile/generateRoleUser/roles.emu';
import { JwtAuthGuard } from 'src/AuthFile/auth.Gurad.Local';

@Controller('coment')
@UseGuards(JwtAuthGuard)
export class ComentController {

    constructor(
        private readonly comentService: ComentserviceService
    ) { }


    @Post()
    @Rol(UserRoles.User,UserRoles.Admin)
    async createComment(@Body() coment: ValideComent, @Res() res: Response): Promise<Comment | any> {
        console.log(coment)
        const comentIsCreate = await this.comentService.createComment(coment)

        res.json({ cmt: comentIsCreate })

    }

    
    @UseGuards(AuthGuard())
    // @Rol(UserRoles.User,UserRoles.Admin) 
    @Get('/getCommentaire')
    async getComment(@Res() res: Response) {
        const getAllComent = await this.comentService.getComment()
        res.json({ data: getAllComent })
    }
} 
