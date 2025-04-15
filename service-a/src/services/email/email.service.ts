import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { EmailReq, EmailRes } from 'src/interfaces/email.interface';

interface EmailClient {
    sendEmail(data: EmailReq): Observable<EmailRes>;
}


@Injectable()
export class EmailService implements OnModuleInit{

    constructor(@Inject("Email_Service") private clientGrpc: ClientGrpc,
                @Inject("KAFKA_SERVICE") private clientKafka: ClientKafka){}

    private emailClient: EmailClient;

    async onModuleInit() {
        this.emailClient =  await this.clientGrpc.getService<EmailClient>("EmailService");
        await this.clientKafka.connect();
    }


    async sendEmailByGrpc(email:string){
        let responseData = await lastValueFrom(this.emailClient.sendEmail({email}));
        console.log(`Email Sent By Grpc...`)
        console.log(`Response..`)
        console.log(responseData); 
    }

    async sendEmailByKafka(email: string){
        await this.clientKafka.emit("topic-email", {email: email})
        console.log(`Email Send By Kafka...`)
    }
}
