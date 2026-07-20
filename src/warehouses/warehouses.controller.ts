import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import { WarehousesService } from './warehouses.service';

import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@ApiTags('Warehouses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(
    private readonly warehousesService: WarehousesService,
  ) {}

  @ApiOperation({
    summary: 'Get all warehouses',
  })
  @ApiResponse({
    status: 200,
    description: 'Warehouses returned successfully',
  })
  @Get()
  findAll() {
    return this.warehousesService.findAll();
  }

  @ApiOperation({
    summary: 'Get warehouse by ID',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: string,
  ) {
    return this.warehousesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create warehouse',
  })
  @ApiBody({
    type: CreateWarehouseDto,
  })
  @Post()
  create(
    @Body()
    dto: CreateWarehouseDto,
  ) {
    return this.warehousesService.create(
      dto.name,
      dto.location,
    );
  }

  @ApiOperation({
    summary: 'Update warehouse',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiBody({
    type: UpdateWarehouseDto,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: string,

    @Body()
    dto: UpdateWarehouseDto,
  ) {
    return this.warehousesService.update(
      id,
      dto.name!,
      dto.location!,
    );
  }

  @ApiOperation({
    summary: 'Delete warehouse',
  })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Warehouse deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Admin only',
  })
  @Roles('ADMIN')
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: string,
  ) {
    return this.warehousesService.remove(id);
  }
}