import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsMongoId()
  to: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
