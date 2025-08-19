import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './applicant.entity';
import { CreateApplicantDto } from './create-applicant.dto';
import { UpdateApplicantDto } from './update-applicant.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepo: Repository<Applicant>,
  ) {}

  async findAll(): Promise<Applicant[]> {
    return this.applicantRepo.find();
  }

  async findOne(id: number): Promise<Applicant> {
    const applicant = await this.applicantRepo.findOne({ where: { id } });
    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${id} not found`);
    }
    return applicant;
  }

  async findByApplicationNumber(appNo: string): Promise<Applicant> {
    const applicant = await this.applicantRepo.findOne({ 
      where: { 
        applicationNumber: appNo,
        departmentId: 81
      } 
    });
    if (!applicant) {
      throw new NotFoundException(`Applicant with application number ${appNo} not found`);
    }
    return applicant;
  }

  async searchByAppNumber(appNo: string, departmentId?: number): Promise<Applicant> {
    const applicant = await this.applicantRepo.findOne({ 
      where: { 
        applicationNumber: appNo,
        departmentId: departmentId || 81
      } 
    });
    if (!applicant) {
      throw new NotFoundException(`Applicant with application number ${appNo} and department ID ${departmentId || 81} not found`);
    }
    return applicant;
  }

  async create(createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    const applicant = this.applicantRepo.create({
      ...createApplicantDto,
      departmentId: createApplicantDto.departmentId || 81,
      stage: createApplicantDto.stage || 1
    });
    return this.applicantRepo.save(applicant);
  }

  async update(id: number, updateApplicantDto: UpdateApplicantDto): Promise<Applicant> {
    const applicant = await this.findOne(id);
    
    // Update all fields that are provided
    Object.keys(updateApplicantDto).forEach(key => {
      if (updateApplicantDto[key] !== undefined) {
        applicant[key] = updateApplicantDto[key];
      }
    });
    
    return this.applicantRepo.save(applicant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.applicantRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Applicant with ID ${id} not found`);
    }
  }

  // Additional methods if needed
  async findByEmail(email: string): Promise<Applicant | null> {
    return this.applicantRepo.findOne({ where: { email } });
  }

  async findByDepartment(departmentId: number): Promise<Applicant[]> {
    return this.applicantRepo.find({ where: { departmentId } });
  }
}