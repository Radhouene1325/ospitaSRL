import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaPersonelValentano } from '../SECHEMA.PERSONNE.VALENTANO';
import { PersoneeService } from '../personeeSERVICE/personee.service';
import { PersonneControllerController } from '../personne-controller/personne-controller.controller';
import { SchamaPresence } from '../TABLEAU.PRESENCE';
import { CONSTANTE } from '../personeeSERVICE/Constante';
import { EncryptionService } from '../CryptageData/Crpt.data';


// @Module({
//   imports: [
    
//     MongooseModule.forFeature([
//        { name: 'personneValentano', schema: SchemaPersonelValentano },
//       { name: 'presence', schema: SchamaPresence },
//     ]),
//   ],

//   controllers: [PersonneControllerController],
//   providers: [PersoneeService]
 
  
// })
// export class PersoneValentanoOspitaModule {}
