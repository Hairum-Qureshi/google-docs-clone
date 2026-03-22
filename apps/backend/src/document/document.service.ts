import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc, DocDocument } from 'src/schemas/Document';
import { DocumentCollaboratorDocument } from 'src/schemas/DocumentCollaborator';
import { DocumentCollaborator } from 'src/schemas/DocumentCollaborator';
import {
  DocumentPermission,
  DocumentPermissionDocument,
} from 'src/schemas/DocumentPermission';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<DocDocument>,
    @InjectModel(DocumentPermission.name)
    private documentPermissionModel: Model<DocumentPermissionDocument>,
    @InjectModel(DocumentCollaborator.name)
    private documentCollaboratorModel: Model<DocumentCollaboratorDocument>,
  ) {}

  async createDocument(userID: string) {
    const newDoc = new this.docModel({
      authorUID: userID,
      title: 'Untitled Document',
    });
    await newDoc.save();

    // We don't need to create a new permission or collaborator document here because the author of the document will automatically have access to the document as the owner, and we can just check for that in our guards when they try to access the document by ID. We only need to create new permission and collaborator documents when we add collaborators to the document, which will be handled in a separate route and service method.

    return newDoc._id;
  }

  async getAllDocuments(userID: string) {
    // this accounts for documents other users have added them to as a collaborator, as well as documents they have created themselves
    const SELECT_FIELDS = '_id title authorUID isPublic createdAt updatedAt';

    const createdDocuments = await this.docModel
      .find({ authorUID: userID })
      .select(SELECT_FIELDS);

    const addedToDocuments = await this.documentCollaboratorModel
      .find({
        userID,
      })
      .select(SELECT_FIELDS);

    return {
      createdDocuments,
      addedToDocuments,
    };
  }

  async getDocumentByID(docID: string) {
    const document = await this.docModel.findById(docID);
    return document;
  }

  async addCollaborators(docID: string, collaborators: string[]) {
    // logic here
  }

  async updateDocumentTitle(docID: string, title: string) {
    return await this.docModel.findByIdAndUpdate(
      docID,
      { title },
      {
        new: true,
      },
    );
  }

  async updateDocumentContent(docID: string, content: Buffer) {
    return await this.docModel.findByIdAndUpdate(
      docID,
      { content }, // 'content' in your Schema should be Type: Buffer
      { new: true },
    );
  }
}
