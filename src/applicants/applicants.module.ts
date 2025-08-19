import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';
import { Applicant } from './applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  providers: [ApplicantsService],
  controllers: [ApplicantsController],
  exports: [ApplicantsService],
})
export class ApplicantsModule {}