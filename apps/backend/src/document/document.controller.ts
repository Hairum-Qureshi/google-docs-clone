import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';

@Controller('api/document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('new')
  @UseGuards(AuthGuard())
  async createDocument(@CurrentUser() user: types.UserPayload) {
    return await this.documentService.createDocument(user._id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getAllDocuments(@CurrentUser() user: types.UserPayload) {
    return this.documentService.getAllDocuments(user._id);
  }

  // TODO - make sure to create a custom guard that checks if the user has access to the document (either as the author or a collaborator) before allowing them to access the document by ID
  @Get('/:docID')
  // @UseGuards(AuthGuard()) // TODO - need to add a custom guard here to check if the user has access to the document before allowing them to access it by ID
  getDocumentByID(@Param('docID') docID: string) {
    return this.documentService.getDocumentByID(docID);
  }

  @Patch('/:docID/update-title')
  @UseGuards(AuthGuard())
  async updateDocumentTitle(
    @Param('docID') docID: string,
    @Body('title') title: string,
  ) {
    // TODO - add validation to ensure that the user has access to the document before allowing them to update it
    return this.documentService.updateDocumentTitle(docID, title);
  }

  // TODO - may need to figure out how to protect these (despite them being invoked through yjs-backend)
  @Patch('/:docID/update-content')
  async updateDocumentContent(
    @Param('docID') docID: string,
    @Body() state: Buffer,
  ) {
    return this.documentService.updateDocumentContent(docID, state);
  }

  @Get('/:docID/binary')
  async getDocumentBinary(@Param('docID') docID: string) {
    const doc = await this.documentService.getDocumentByID(docID);
    return doc?.content;
  }
}
