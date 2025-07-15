import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MqttService } from './mqtt/mqtt.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [MqttService],
})
export class AppModule {}
