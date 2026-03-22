import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class AddDocumentCollaboratorsDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  collaborators: { email: string; role: Role }[];
}
