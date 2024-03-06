import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(@InjectRepository(Test)
  private testRepository: Repository<Test>) { }

  async create(test: Test): Promise<Test> {
    const newTest = this.testRepository.create(test);
    return await this.testRepository.save(newTest);
  }

  async findAll(): Promise<Test[]> {
    return await this.testRepository.find();
  }

  async findOne(id: number): Promise<Test> {
    return await this.testRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, test: Test):
    Promise<number> {
    await this.testRepository.update(id, test);
    return id;
  }

  async remove(id: number): Promise<number> {
    await this.testRepository.delete(id);
    return id
  }
}
