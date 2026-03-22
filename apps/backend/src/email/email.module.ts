import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ResendService } from './resend.service';

@Module({
  providers: [EmailService, ResendService],
  controllers: [EmailController],
  imports: [AuthModule],
  exports: [EmailService],
})
export class EmailModule {}
