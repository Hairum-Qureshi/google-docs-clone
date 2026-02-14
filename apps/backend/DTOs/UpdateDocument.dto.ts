import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;
}
