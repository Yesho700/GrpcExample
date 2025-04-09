import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MessasgeReq } from 'src/interfaces/user.interface';
import { UserService } from './user.service';
@Controller()
export class UserController {

    constructor(private userService: UserService){}

    @GrpcMethod("UserService", "GetUser")
    async getUser(data: MessasgeReq){
        return await this.userService.getUser(data);
    }
}
