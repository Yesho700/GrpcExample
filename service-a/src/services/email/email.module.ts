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
      },

      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {

          client: {
            brokers: ['localhost:29092', 'kafka:9092', 'host.docker.internal:9092']
          },
          
          producer: {
            allowAutoTopicCreation: true
          }
          
        }
      }

    ])
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports:[EmailService]
})
export class EmailModule {}
