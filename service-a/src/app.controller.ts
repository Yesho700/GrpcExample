import { Body, Controller, Get, Post, Request} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("printname")
  PrintName(@Request() req){
    this.appService.PrintName(req.body.name);
  }
}
