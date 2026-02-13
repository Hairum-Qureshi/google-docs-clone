import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc, DocDocument } from 'src/schemas/Document';

@Injectable()
export class DocumentService {
  constructor(@InjectModel(Doc.name) private docModel: Model<DocDocument>) {}

  async createDocument(userID: string) {
    const newDoc = new this.docModel({
      authorUID: userID,
      title: 'Untitled Document',
    });
    await newDoc.save();
    return newDoc._id;
  }
}
