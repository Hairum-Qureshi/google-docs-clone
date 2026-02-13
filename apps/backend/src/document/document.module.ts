import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [DocumentService],
  controllers: [DocumentController],
  imports: [AuthModule],
})
export class DocumentModule {}
