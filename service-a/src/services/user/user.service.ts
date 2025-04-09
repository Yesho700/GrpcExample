import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { MessageRes, MessasgeReq } from 'src/interfaces/user.interface';
import { EmailService } from '../email/email.service';



interface UserClient {
    GetUser(data: MessasgeReq ): Observable<MessageRes>;
}

@Injectable()
export class UserService implements OnModuleInit {

    constructor(
        @Inject("User_Service") private client: ClientGrpc,
        private emailService: EmailService
    ){}
    private userClient : UserClient;

    async onModuleInit() {
        this.userClient = await this.client.getService<UserClient>("UserService")
    }

    async getUser(userId: string){
        let responseData = await firstValueFrom(this.userClient.GetUser({userId}));
        console.log(responseData)
        await this.emailService.sendEmail(responseData.email);
    }

}
