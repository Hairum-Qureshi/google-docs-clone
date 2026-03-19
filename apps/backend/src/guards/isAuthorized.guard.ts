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
import { Reflector } from '@nestjs/core';

@Injectable()
export class HasRolePermissions implements CanActivate {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<DocDocument>,
    @InjectModel(DocumentPermission.name)
    private documentPermissionModel: Model<DocumentPermission>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const docID: string = context.switchToHttp().getRequest().params.docID;
    const userID: string = context.switchToHttp().getRequest().user._id;
    const roles: Role[] = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    const document = await this.docModel.findById(docID);
    const userPermission = await this.documentPermissionModel.findOne({
      docID,
      userID,
    });

    // first we need to check whether the doc exists
    if (!document) throw new NotFoundException('Document not found');
    if (!userPermission || document.authorUID !== userID)
      throw new ForbiddenException('You do not have access to this document');

    // next we need to check whether if the user is a document author or editor; if so, grant them access to the document; otherwise, throw a forbidden exception
    if (
      document.authorUID === userID ||
      roles.includes(userPermission.role as Role)
    ) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to perform this action',
    );
  }
}
