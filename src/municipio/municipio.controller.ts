import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/request/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/request/update-municipio.dto';
import { MunicipioResponseDto } from './dto/response/municipio-response.dto';
import { AdminOnly } from '../auth/decorators/admin-only.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@AdminOnly()
@ApiTags('Municipios')
@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo municipio' })
  @ApiBody({ type: CreateMunicipioDto })
  @ApiResponse({
    status: 201,
    description: 'Municipio creado exitosamente',
    type: MunicipioResponseDto,
  })
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipioService.create(createMunicipioDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los municipios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de municipios',
    type: [MunicipioResponseDto],
  })
  async findAll(): Promise<MunicipioResponseDto[]> {
    return this.municipioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un municipio por ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del municipio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Municipio encontrado',
    type: MunicipioResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Municipio no encontrado' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MunicipioResponseDto> {
    const municipio = await this.municipioService.findOne(id);

    if (!municipio) {
      throw new NotFoundException(`Municipio con id ${id} no encontrado`);
    }

    return municipio;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar la información de un municipio' })
  @ApiParam({ name: 'id', description: 'ID numérico del municipio', example: 1 })
  @ApiBody({ type: UpdateMunicipioDto })
  @ApiResponse({
    status: 200,
    description: 'Municipio actualizado',
    type: MunicipioResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMunicipioDto: UpdateMunicipioDto,
  ): Promise<MunicipioResponseDto | null> {
    return this.municipioService.update(id, updateMunicipioDto);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activar un municipio' })
  @ApiParam({ name: 'id', description: 'ID numérico del municipio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Municipio activado exitosamente',
  })
  async activate(@Param('id', ParseIntPipe) id: number) {
    return this.municipioService.activate(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (inactivar) un municipio' })
  @ApiParam({ name: 'id', description: 'ID numérico del municipio', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Municipio eliminado exitosamente',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.municipioService.remove(id);
  }
}
