import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Education } from './entities/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Applicant } from '../applicants/applicant.entity'; // 👈 Import Applicant

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepo: Repository<Education>,

    @InjectRepository(Applicant) // 👈 Inject Applicant repository
    private applicantRepo: Repository<Applicant>,
  ) {}

  async create(dto: CreateEducationDto): Promise<Education> {
    // 👇 Fetch the full applicant first
    const applicant = await this.applicantRepo.findOneBy({ id: dto.applicantId });
    if (!applicant) throw new NotFoundException(`Applicant with id ${dto.applicantId} not found`);

    const education = this.educationRepo.create({
      ...dto,
      applicant, // 👈 Pass the full applicant object
    });

    return this.educationRepo.save(education);
  }

  async findAll(): Promise<Education[]> {
    return this.educationRepo.find({
      relations: ['applicant'],
    });
  }

  async findOne(id: number): Promise<Education> {
    const education = await this.educationRepo.findOne({
      where: { id },
      relations: ['applicant'],
    });
    if (!education) throw new NotFoundException(`Education with id ${id} not found`);
    return education;
  }

  async findByApplicantId(applicantId: number): Promise<Education[]> {
    return this.educationRepo.find({
      where: { applicantId },
      relations: ['applicant'],
    });
  }

  async update(id: number, dto: UpdateEducationDto): Promise<Education> {
    const education = await this.findOne(id);
    
    // 👇 If applicantId is being updated, fetch the full applicant
    if (dto.applicantId && dto.applicantId !== education.applicantId) {
      const applicant = await this.applicantRepo.findOneBy({ id: dto.applicantId });
      if (!applicant) throw new NotFoundException(`Applicant with id ${dto.applicantId} not found`);
      education.applicant = applicant;
    }
    
    Object.assign(education, dto);
    return this.educationRepo.save(education);
  }

  async remove(id: number): Promise<void> {
    const education = await this.findOne(id);
    await this.educationRepo.remove(education);
  }

  async search(term: string): Promise<Education[]> {
    return this.educationRepo.find({
      where: [
        { school: ILike(`%${term}%`) },
        { degree: ILike(`%${term}%`) },
        { fieldOfStudy: ILike(`%${term}%`) },
      ],
      relations: ['applicant'],
    });
  }
}