import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/request/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/request/update-municipio.dto';
import { MunicipioResponseDto } from './dto/response/municipio-response.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags('municipios')
@Controller('municipio')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  create(@Body() createMunicipioDto: CreateMunicipioDto) {
    return this.municipioService.create(createMunicipioDto);
  }

  @Get()
  async findAll(): Promise<MunicipioResponseDto[]> {
    return this.municipioService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number, // convierte el param string a number
  ): Promise<MunicipioResponseDto> {
    const municipio = await this.municipioService.findOne(id);

    if (!municipio) {
      throw new NotFoundException(`Municipio con id ${id} no encontrado`);
    }

    return municipio;
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMunicipioDto: UpdateMunicipioDto
  ): Promise<MunicipioResponseDto | null> {
    return this.municipioService.update(id, updateMunicipioDto);
  }

  @Patch(':id/activate')
  async activate(@Param('id', ParseIntPipe) id: number) {
  return this.municipioService.activate(id);
}

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.municipioService.remove(id);
  }
}
