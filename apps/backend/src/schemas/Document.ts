import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Doc {
  @Prop({ type: String, ref: 'User' })
  authorUID: string;

  @Prop({ type: String, required: true, default: 'Untitled Document' })
  title: string;

  @Prop({ type: Buffer })
  content: Buffer;

  @Prop({ type: String })
  contentText: string;

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

SchemaFactory.createForClass(Doc);
export const DocSchema = SchemaFactory.createForClass(Doc);
export type DocDocument = HydratedDocument<Doc>;
