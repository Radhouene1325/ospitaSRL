import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ModemcontroleController } from '../modemcontrole/modemcontrole.controller';
import { ServiceModemService } from '../service-modem/service-modem.service';

@Module({
    imports:[HttpModule],
    controllers:[ModemcontroleController],
    providers:[ServiceModemService]

})
export class ModemModelModule {}
