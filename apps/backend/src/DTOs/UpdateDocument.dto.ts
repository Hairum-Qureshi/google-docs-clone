import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDocument {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;
}
