import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from 'src/schemas/Document';
import {
  DocumentPermission,
  DocumentPermissionSchema,
} from 'src/schemas/DocumentPermission';
import {
  DocumentCollaborator,
  DocumentCollaboratorSchema,
} from 'src/schemas/DocumentCollaborator';
import { User, UserSchema } from 'src/schemas/User';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [DocumentService],
  controllers: [DocumentController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Doc.name,
        schema: DocSchema,
      },
      {
        name: DocumentPermission.name,
        schema: DocumentPermissionSchema,
      },
      {
        name: DocumentCollaborator.name,
        schema: DocumentCollaboratorSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
    EmailModule,
  ],
})
export class DocumentModule {}
