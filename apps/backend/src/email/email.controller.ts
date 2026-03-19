import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(readonly emailService: EmailService) {}

  
}
