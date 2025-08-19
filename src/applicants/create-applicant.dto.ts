import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateApplicantDto {
  @IsString()
  surname: string;

  @IsString()
  firstname: string;

  @IsString()
  applicationNumber: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  stage?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsString()
  cohort?: string;

  @IsOptional()
  @IsString()
  session?: string;

  @IsOptional()
  @IsString()
  phone?: string;

}