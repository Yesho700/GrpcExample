import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  PrintName(name:string){
    console.log(`Hello ${name}`);
  }
}
