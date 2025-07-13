import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { ServiceService } from './service.service';
  import { CreateServiceDto } from './dto/create-service.dto';
  import { UpdateServiceDto } from './dto/update-service.dto';
  import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('Services')
  @Controller('services')
  export class ServiceController {
    constructor(private readonly service: ServiceService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create new service' })
    create(@Body() dto: CreateServiceDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all services' })
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a service by ID' })
    @ApiParam({ name: 'id' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a service' })
    update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a service' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  