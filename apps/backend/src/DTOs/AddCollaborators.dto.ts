import { IsNotEmpty, IsString } from 'class-validator';

export class AddDocumentCollaboratorsDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  collaborators: { email: string; role: string }[];
}
