import { IsString, IsDateString, IsBoolean, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEducationDto {
    @IsString()
    school: string;

    @IsString()
    degree: string;

    @IsString()
    fieldOfStudy: string;

    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsBoolean()
    present?: boolean;

    @IsInt()
    applicantId: number;
}

// For bulk create (array of educations)
export class CreateApplicantEducationDto {
    @ValidateNested({ each: true })
    @Type(() => CreateEducationDto)
    educations: CreateEducationDto[];
}
