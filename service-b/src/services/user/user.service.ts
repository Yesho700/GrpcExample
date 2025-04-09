import { Injectable } from '@nestjs/common';
import { MessasgeReq, MessageRes} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {

    async getUser(data: MessasgeReq){
        console.log(`userId : ${data.userId}`);
        return { userId: data.userId, name:"VishalBhaii", email:"yesho789@gmail.com" } as MessageRes;
    }
}
