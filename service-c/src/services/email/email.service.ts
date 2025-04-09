import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailRes } from 'src/interfaces/email.interface';


@Injectable()
export class EmailService implements OnModuleInit{
  private transporter;

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "31882cs@gmail.com",
        pass: "axjv nzfq mslm wmet"
      },
    });
  }

  async sendEmail(email: string) {
    try {
      await this.transporter.sendMail({
        from: 'NodeMailer',
        to: email,
        subject: "Checking Microservice",
        text: "Hello I am From Microservice"
      });
      console.log('Email sent successfully');
      return {ack:`Email Sent Successfully to : ${email}`} as EmailRes;
    } catch (error) {
      console.error('Error sending email:', error);
      return {ack:"Email Couldn't sent!!"} as EmailRes;
    }
  }
}