import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { GrpcMethod } from '@nestjs/microservices';
import { EmailReq } from 'src/interfaces/email.interface';

@Controller()
export class EmailController {
    constructor(private emailService: EmailService){}

    @GrpcMethod("EmailService", "sendEmail")
    async sendEmail(data: EmailReq){
        return await this.emailService.sendEmail(data.email);
    }
}
