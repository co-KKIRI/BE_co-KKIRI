import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from 'src/entity/member.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class FCMQueryRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
}
