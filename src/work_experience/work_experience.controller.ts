import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { WorkExperienceService } from './work_experience.service';
import { CreateWorkExperienceDto } from './dto/create-work_experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work_experience.dto';

@Controller('work-experiences')
export class WorkExperienceController {
  constructor(private readonly workExpService: WorkExperienceService) {}

  @Post()
  create(@Body() dto: CreateWorkExperienceDto) {
    return this.workExpService.create(dto);
  }

  @Get()
  findAll() {
    return this.workExpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workExpService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWorkExperienceDto) {
    return this.workExpService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workExpService.remove(id);
  }
}