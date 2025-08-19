import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  ParseIntPipe 
} from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './applicant.entity';
import { CreateApplicantDto } from './create-applicant.dto'
import { UpdateApplicantDto } from './update-applicant.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get()
  async findAll(): Promise<Applicant[]> {
    return this.applicantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Applicant> {
    return this.applicantsService.findOne(id);
  }

  @Get('by-app-number/:appNo')
  async findByApplicationNumber(@Param('appNo') appNo: string): Promise<Applicant> {
    return this.applicantsService.findByApplicationNumber(appNo);
  }

  @Get('search/:appNo')
  async searchByAppNumber(
    @Param('appNo') appNo: string,
    @Query('departmentId') departmentId?: number
  ): Promise<Applicant> {
    return this.applicantsService.searchByAppNumber(appNo, departmentId);
  }

  @Post()
  async create(@Body() createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    return this.applicantsService.create(createApplicantDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApplicantDto: UpdateApplicantDto
  ): Promise<Applicant> {
    return this.applicantsService.update(id, updateApplicantDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.applicantsService.remove(id);
  }
}