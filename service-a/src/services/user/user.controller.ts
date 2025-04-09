import { Controller, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userSerive: UserService){}
    
    @Post()
    async getUser(@Request() req){
        console.log("Working!!")
        this.userSerive.getUser(req.body.userId);
    }
}
