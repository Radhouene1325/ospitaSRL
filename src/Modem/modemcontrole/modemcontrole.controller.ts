import { Controller, Get, Req } from '@nestjs/common';
import { ServiceModemService } from '../service-modem/service-modem.service';
import axios from 'axios';
import { Request } from 'express';

@Controller('modemcontrole')
export class ModemcontroleController {

    constructor(
        private readonly modemService: ServiceModemService
    ) { }


    @Get('info')
    async getModemInfo(@Req() req:Request) {
        console.log(req.headers['x-modem-acces-key'])
        const ip = await axios.get('https://api.ipify.org?format=json')
        console.log(ip)
        const res = await this.modemService.getModemInfo(ip)
        console.log(res)
    }

}
