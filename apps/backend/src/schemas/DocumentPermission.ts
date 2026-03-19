import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DocumentPermission {
  @Prop({ type: String, ref: 'User' })
  userID: string;

  @Prop({ type: String, ref: 'Doc' })
  docID: string;

  @Prop({ type: String, enum: ['editor', 'viewer'] })
  role: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(DocumentPermission);
export const DocumentPermissionSchema = SchemaFactory.createForClass(DocumentPermission);
export type DocumentPermissionDocument = HydratedDocument<DocumentPermission>;
