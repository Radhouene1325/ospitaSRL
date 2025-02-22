import { HttpService } from '@nestjs/axios';
import { Injectable, Options } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { error } from 'console';
import { Observable } from 'rxjs';
import * as http from 'http'
@Injectable()
export class ServiceModemService {

    constructor(

    ) { }


    async getModemInfo(ip): Promise<any> {

        const adp = ip.data.ip
        const response = await axios.get(`http://${adp}/api/info`)

        return response


                                                        
    }

}
