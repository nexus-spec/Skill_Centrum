import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { Education } from './entities/education.entity';
import { Applicant } from '../applicants/applicant.entity'; // 👈 Import Applicant entity
import { ApplicantsModule } from '../applicants/applicants.module'; // 👈 Import ApplicantsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Education, Applicant]), // 👈 Add Applicant here
    ApplicantsModule, // 👈 Import ApplicantsModule
  ],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}