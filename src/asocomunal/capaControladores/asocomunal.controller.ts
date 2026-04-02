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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('asocomunal')
@Controller('asocomunal')
export class AsocomunalController {
  constructor(private readonly asocomunalService: AsocomunalService) {}

  @Post()
  async create(
    @Body() createAsocomunalDto: CreateAsocomunalDto,
  ): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.create(createAsocomunalDto);
  }

  @Get()
  async findAll(): Promise<AsocomunalResponseDto[]> {
    return this.asocomunalService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<AsocomunalResponseDto | null> {
    return this.asocomunalService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAsocomunalDto: UpdateAsocomunalDto,
  ): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.update(+id, updateAsocomunalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.remove(+id);
  }

  @Patch(':id/activate')
  async activate(@Param('id') id: string): Promise<AsocomunalResponseDto> {
    return this.asocomunalService.activate(+id);
  }
}
