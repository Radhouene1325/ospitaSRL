

// encryption.service.ts

import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

import * as zlib from 'zlib';
@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer; // Store this securely, don't hard-code it,
  private readonly secretKey =  "khalfaradhouene@@///???<><><>>>>><<<"

  constructor() {
    // Generate or load the key securely (never hard-code it)
    ; // For AES-256
  }

  encrypt (data: any[]) {
  
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    
    return encryptedData;
  };
  endecrypt (data: any)  {

    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData) ;
  }
 
}
