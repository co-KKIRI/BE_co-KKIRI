import { Controller, Get, Inject, Logger, LoggerService, Req, UseGuards } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get()
  @UseGuards(RolesGuard)
  getHello(@Req() req): any {
    this.logger.log('Hello World!');
    return { result: 123 };
  }
}
