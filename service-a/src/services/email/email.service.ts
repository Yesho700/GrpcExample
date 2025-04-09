import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { EmailReq, EmailRes } from 'src/interfaces/email.interface';

interface EmailClient {
    sendEmail(data: EmailReq): Observable<EmailRes>;
}


@Injectable()
export class EmailService implements OnModuleInit{

    constructor(@Inject("Email_Service") private client: ClientGrpc){}

    private emailClient: EmailClient;

    onModuleInit() {
        this.emailClient =  this.client.getService<EmailClient>("EmailService");
    }


    async sendEmail(email:string){
        let responseData = await lastValueFrom(this.emailClient.sendEmail({email}));
        console.log(responseData); 
    }
}
