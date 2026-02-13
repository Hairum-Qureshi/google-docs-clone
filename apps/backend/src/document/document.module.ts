import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Doc, DocSchema } from 'src/schemas/Document';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [DocumentService],
  controllers: [DocumentController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Doc.name,
        schema: DocSchema,
      },
    ]),
    AuthModule,
  ],
})
export class DocumentModule {}
