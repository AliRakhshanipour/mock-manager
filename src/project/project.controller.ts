import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { ProjectEntity } from './entities/project.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, type: ProjectEntity })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateProjectDto): Promise<ProjectEntity> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, type: [ProjectEntity] })
  findAll(): Promise<ProjectEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  findOne(@Param('id') id: string): Promise<ProjectEntity> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  remove(@Param('id') id: string): Promise<ProjectEntity> {
    return this.service.remove(id);
  }
}
