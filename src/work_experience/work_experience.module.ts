import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperience } from './entities/work_experience.entity';
import { Applicant } from '../applicants/applicant.entity';
import { WorkExperienceService } from './work_experience.service';
import { WorkExperienceController } from './work_experience.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience, Applicant])],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService],
})
export class WorkExperienceModule {}
