import { IsEmail, IsOptional, IsString, IsDateString, IsNumber, IsEnum, IsArray, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsNumber()
  @IsOptional()
  @Min(50)
  @Max(300)
  height?: number;

  @IsNumber()
  @IsOptional()
  @Min(20)
  @Max(500)
  weight?: number;

  @IsEnum(['male', 'female', 'other'])
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interest?: string[];
}

export class UpdateImageDto {
  @IsString()
  image: string;
}
