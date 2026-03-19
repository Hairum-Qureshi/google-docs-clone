import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/enums/roles.enum';
import { Doc, DocDocument } from 'src/schemas/Document';
import { DocumentPermission } from 'src/schemas/DocumentPermission';

@Injectable()
export class HasRolePermissions implements CanActivate {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<DocDocument>,
    @InjectModel(DocumentPermission.name)
    private documentPermissionModel: Model<DocumentPermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const docID: string = context.switchToHttp().getRequest().params.docID;
    const userID: string = context.switchToHttp().getRequest().user._id;

    const document = await this.docModel.findById(docID);
    const userPermission = await this.documentPermissionModel.findOne({
      docID,
      userID,
    });

    // first we need to check whether the doc exists
    if (!document) throw new NotFoundException('Document not found');

    // next we need to check whether if the user is a document author or editor; if so, grant them access to the document; otherwise, throw a forbidden exception
    if (document.authorUID === userID || userPermission?.role === Role.EDITOR) {
      return true;
    }

    throw new ForbiddenException('You do not have access to this document');
  }
}
