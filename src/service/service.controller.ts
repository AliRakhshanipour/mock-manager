import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse,
    ApiParam,
  } from '@nestjs/swagger';
  import { CreateServiceDto } from './dto/create-service.dto';
  import { UpdateServiceDto } from './dto/update-service.dto';
  import { ServiceService } from './service.service';
  
  @ApiTags('Services')
  @Controller('services')
  export class ServiceController {
    constructor(private readonly service: ServiceService) {}
  
    @Post()
    @ApiOperation({ summary: 'Register a new service' })
    @ApiResponse({ status: 201, description: 'Service created' })
    create(@Body() dto: CreateServiceDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all services' })
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get service by ID' })
    @ApiNotFoundResponse({ description: 'Service not found' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update service by ID' })
    update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete service by ID' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  