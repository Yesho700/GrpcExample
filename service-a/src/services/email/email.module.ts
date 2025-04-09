import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Module({
  imports:[
    ClientsModule.register([
      {
        name:"Email_Service",
        transport: Transport.GRPC,
        options:{
          package: "email",
          protoPath: 'src/proto/email.proto',
          url:"localhost:5002"
        }
      }
    ])
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports:[EmailService]
})
export class EmailModule {}
