import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { AsocomunalService } from '../fachadaService/asocomunal.service';
import { CreateAsocomunalDto } from '../fachadaService/dto/request/create-asocomunal.dto';
import { UpdateAsocomunalDto } from '../fachadaService/dto/request/update-asocomunal.dto';
import { AsocomunalResponseDto } from '../fachadaService/dto/response/asocomunal-response.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

/**
 * Controlador para la gestión de asocomunales.
 * 
 * Maneja las operaciones CRUD y otras funcionalidades relacionadas con las asocomunales,
 * interactuando con el servicio `AsocomunalService`.
 */
@ApiTags('Asocomunal')
@Controller('asocomunal')
export class AsocomunalController {
  constructor(private readonly asocomunalService: AsocomunalService) { }

  /**
   * Crea una nueva asocomunal.
   * @param createAsocomunalDto - Datos de la nueva asocomunal.
   * @returns La asocomunal creada.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva Asocomunal' })
  @ApiBody({ type: CreateAsocomunalDto })
  @ApiResponse({
    status: 201,
    description: 'Asocomunal creada',
    type: AsocomunalResponseDto,
  })
  async create(
    @Body() createAsocomunalDto: CreateAsocomunalDto,
  ): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.create(createAsocomunalDto);
  }

  /**
   * Obtiene todas las asocomunales.
   * @returns Lista de asocomunales.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todas las asocomunales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de asocomunales',
    type: [AsocomunalResponseDto],
  })
  async findAll(): Promise<AsocomunalResponseDto[]> {
    return this.asocomunalService.findAll();
  }

  /**
   * Obtiene una asocomunal por ID.
   * @param id - ID de la asocomunal.
   * @returns La asocomunal encontrada.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asocomunal por ID' })
  @ApiParam({ name: 'id', description: 'ID de la asocomunal' })
  @ApiResponse({
    status: 200,
    description: 'Asocomunal encontrada',
    type: AsocomunalResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<AsocomunalResponseDto | null> {
    return this.asocomunalService.findOne(+id);
  }

  /**
   * Actualiza una asocomunal.
   * @param id - ID de la asocomunal.
   * @param updateAsocomunalDto - Datos de la asocomunal a actualizar.
   * @returns La asocomunal actualizada.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una asocomunal' })
  @ApiParam({ name: 'id', description: 'ID de la asocomunal' })
  @ApiBody({ type: UpdateAsocomunalDto })
  @ApiResponse({
    status: 200,
    description: 'Asocomunal actualizada',
    type: AsocomunalResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateAsocomunalDto: UpdateAsocomunalDto,
  ): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.update(+id, updateAsocomunalDto);
  }

  /**
   * Elimina una asocomunal.
   * @param id - ID de la asocomunal.
   * @returns La asocomunal eliminada.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una asocomunal' })
  @ApiParam({ name: 'id', description: 'ID de la asocomunal' })
  @ApiResponse({
    status: 200,
    description: 'Asocomunal eliminada',
    type: AsocomunalResponseDto,
  })
  async remove(@Param('id') id: string): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.remove(+id);
  }

  /**
   * Activa una asocomunal.
   * @param id - ID de la asocomunal.
   * @returns La asocomunal activada.
   */
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activar una asocomunal' })
  @ApiParam({ name: 'id', description: 'ID de la asocomunal' })
  @ApiResponse({
    status: 200,
    description: 'Asocomunal activada',
    type: AsocomunalResponseDto,
  })
  async activate(@Param('id') id: string): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.activate(+id);
  }

  /**
   * Obtiene una asocomunal con sus JAC asociadas.
   * @param id - ID de la asocomunal.
   * @returns La asocomunal con sus JAC.
   */
  @Get(':id/jacs')
  @ApiOperation({ summary: 'Obtener una asocomunal con sus JAC asociadas' })
  @ApiParam({ name: 'id', description: 'ID de la asocomunal' })
  @ApiResponse({
    status: 200,
    description: 'Asocomunal con sus JAC',
    type: AsocomunalResponseDto,
  })
  async findJacs(@Param('id') id: number): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.getAsocomunalWithJacs(+id);
  }
}
