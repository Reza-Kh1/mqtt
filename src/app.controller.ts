import { Controller, Get, RequestTimeoutException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  if() {
    throw new RequestTimeoutException('error for test', {
      description: 'desc for error',
    })
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
