import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DocumentCollaborator {
  @Prop({ type: String, ref: 'User' })
  userID: string;

  @Prop({ type: String, ref: 'Doc' })
  docID: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(DocumentCollaborator);
export const DocumentCollaboratorSchema =
  SchemaFactory.createForClass(DocumentCollaborator);
export type DocumentCollaboratorDocument =
  HydratedDocument<DocumentCollaborator>;
