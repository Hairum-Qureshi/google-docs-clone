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
import { UpdateDocument } from 'src/DTOs/UpdateDocument.dto';

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
  @UseGuards(AuthGuard())
  getDocumentByID(@Param('docID') docID: string) {
    return this.documentService.getDocumentByID(docID);
  }

  @Patch('/:docID/update')
  @UseGuards(AuthGuard())
  async updateDocumentContent(
    @Param('docID') docID: string,
    @Body() updateData: UpdateDocument,
  ) {
    // TODO - add validation to ensure that the user has access to the document before allowing them to update it
    return await this.documentService.updateDocumentContent(docID, updateData);
  }
}
