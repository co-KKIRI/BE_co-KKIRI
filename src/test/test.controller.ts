import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body() newTest: Test): Promise<Test> {
    return await this.testService.create(newTest);
  }

  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Test> {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() newTest: Test,
  ): Promise<number> {
    return this.testService.update(+id, newTest);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.testService.remove(+id);
  }
}
