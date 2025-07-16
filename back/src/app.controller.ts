import { Controller, Get, RequestTimeoutException } from '@nestjs/common';

@Controller()
export class AppController {
  if() {
    throw new RequestTimeoutException('error for test', {
      description: 'desc for error',
    })
  }
  @Get()
  getHello(): string {
    return 'true'
  }
}
