import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PersoneeService } from '../personeeSERVICE/personee.service';
import { DTOPERSONNEVALENTANO } from '../DTO.PERSONNE.VALENTANO';
import { PersonneValentano } from '../SECHEMA.PERSONNE.VALENTANO';
import { Request, Response } from 'express';
import * as escapeHtml from 'escape-html';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as arp from 'node-arp';
import { DtoLoginPersonne } from '../DtoLoginPersonne';
import { JwtAuthGuard } from 'src/AuthFile/auth.Gurad.Local';
import axios from 'axios';
import { AuthGuard } from '@nestjs/passport';


const execPromise = promisify(exec);

@Controller('VALENTANO')
// @UseGuards(JwtAuthGuard)
export class PersonneControllerController {
  constructor(private readonly personneservice: PersoneeService) { }

  @Post('/create')
  async create(
    @Body() dtoPersonne,
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<PersonneValentano | any> {
    // console.log(reques
    const getIpModem = await axios.get('https://api.ipify.org?format=json')
    console.log(getIpModem?.data.ip)


    const fixedParameter = uuidv4();
    console.log(fixedParameter);
    return this.personneservice
      .createPersonne({ dtoPersonne, fixedParameter })
      .then((e) => {
        if (e) {

          res.json(e);
        } else {
          res.json(e)
        }
      });
  }

  @Post('/login/')

  async personnelogin(@Body() login: DtoLoginPersonne, @Query() params: { keySecret: string }) {
    // console.log(verif)

    // console.log(login)
    const user = await this.personneservice.loginPersonne(login, params);
    console.log(user)

    return user
  }


  @Post('/ajouterRagazo')

  async ajoute(@Body() push: string, @Res() res: Response, @Query('id') id: string) {
    console.log(push)
    console.log(id)
    const ajoute = await this.personneservice.createRagazo(push, id)
    return res.json(ajoute)
  }



  @Post('/prisence')
  // @UseGuards(AuthGuard())
  async ispresente(
   
    @Query('prise') prise: string,
    @Req() req: Request,
    @Body() data: string,
   
  ): Promise<any> {
    // console.log(prise)

    const index = await this.personneservice.updatePresence(data, prise, req);
    
    return index;

  }

  @Post('/getPresence')
  // @UseGuards(JwtAuthGuard)
  async getAllPresence(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() request: Request,
    @Body() body,
  ) {
   

    const get = await this.personneservice.findAllPresence();

    res.json(get);
  }



  @Get('/all')
  // @UseGuards(AuthGuard())
  async allPersonne(@Res() res: Response,@Req()req:Request) {
    console.log(req.body)
    const {id}=req.body
    const personne = await this.personneservice.findAllPersonne(id)
    // console.log(personne)
    res.json({ data: personne })
  }
}
