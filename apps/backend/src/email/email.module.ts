import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ResendService } from './resend.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [EmailService, ResendService],
  controllers: [EmailController],
  imports: [AuthModule, ConfigModule],
})
export class EmailModule {}
