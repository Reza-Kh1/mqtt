import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttService } from './mqtt/mqtt.service';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),EventsModule],
  controllers: [AppController],
  providers: [MqttService],
})
export class AppModule {}
