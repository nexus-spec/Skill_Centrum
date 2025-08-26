import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkExperience } from './entities/work_experience.entity';
import { CreateWorkExperienceDto } from './dto/create-work_experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work_experience.dto';
import { Applicant } from '../applicants/applicant.entity';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectRepository(WorkExperience)
    private workExperienceRepo: Repository<WorkExperience>,

    @InjectRepository(Applicant)
    private applicantRepo: Repository<Applicant>,
  ) {}

  async create(dto: CreateWorkExperienceDto): Promise<WorkExperience> {
    const applicant = await this.applicantRepo.findOneBy({ id: dto.applicantId });
    if (!applicant) throw new NotFoundException(`Applicant with id ${dto.applicantId} not found`);

    const workExp = this.workExperienceRepo.create({
      ...dto,
      applicant,
    });

    return this.workExperienceRepo.save(workExp);
  }

  async findAll(): Promise<WorkExperience[]> {
    return this.workExperienceRepo.find({
      relations: ['applicant'],
    });
  }

  async findOne(id: number): Promise<WorkExperience> {
    const workExp = await this.workExperienceRepo.findOne({
      where: { id },
      relations: ['applicant'],
    });
    if (!workExp) throw new NotFoundException(`WorkExperience with id ${id} not found`);
    return workExp;
  }

  async update(id: number, dto: UpdateWorkExperienceDto): Promise<WorkExperience> {
    const workExp = await this.findOne(id);

    if (dto.applicantId) {
      const applicant = await this.applicantRepo.findOneBy({ id: dto.applicantId });
      if (!applicant) throw new NotFoundException(`Applicant with id ${dto.applicantId} not found`);
      workExp.applicant = applicant;
    }

    Object.assign(workExp, dto);
    return this.workExperienceRepo.save(workExp);
  }

  async remove(id: number): Promise<void> {
    const workExp = await this.findOne(id);
    await this.workExperienceRepo.remove(workExp);
  }
}