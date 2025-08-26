import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateWorkExperienceDto {
  @IsInt()
  applicantId: number;

  @IsString()
  position: string;

  @IsString()
  companyName: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsString()
  task: string;
}