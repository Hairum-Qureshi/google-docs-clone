import { Controller, Post, UseGuards } from '@nestjs/common';
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
    const documentId = await this.documentService.createDocument(user._id);
    return { documentId };
  }
}
