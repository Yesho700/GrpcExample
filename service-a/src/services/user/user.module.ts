import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    EmailModule,
    ClientsModule.register([
    {
      name: "User_Service",
      transport: Transport.GRPC,
      options: {
        package: "user",
        protoPath: 'src/proto/user.proto',
        url: "localhost:5001"
    }}
    ])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
