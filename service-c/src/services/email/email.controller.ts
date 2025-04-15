import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { EmailReq } from 'src/interfaces/email.interface';

@Controller()
export class EmailController {
    constructor(private emailService: EmailService){}

    @GrpcMethod("EmailService", "sendEmail")
    async sendEmail1(data: EmailReq){
        return await this.emailService.sendEmail(data.email);
    }

    @MessagePattern('topic-email')
    async sendEmail2(@Payload() message: any){
        return await this.emailService.sendEmail(message.email);
    }
}
