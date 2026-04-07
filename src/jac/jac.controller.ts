import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JacService } from './jac.service';
import { CreateJacDto } from './dto/create-jac.dto';
import { UpdateJacDto } from './dto/update-jac.dto';

@Controller('jac')
export class JacController {
  constructor(private readonly jacService: JacService) {}

  /*
  @Post()
  create(@Body() createJacDto: CreateJacDto) {
    return this.jacService.create(createJacDto);
  }

  @Get()
  findAll() {
    return this.jacService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jacService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJacDto: UpdateJacDto) {
    return this.jacService.update(+id, updateJacDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jacService.remove(+id);
  }
    */
}
