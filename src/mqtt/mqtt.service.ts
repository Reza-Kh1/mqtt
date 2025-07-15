import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class MqttService implements OnModuleInit {
  onModuleInit() {
    console.log('✅ MqttService آماده دریافت پیام‌هاست');
  }

  @EventPattern('pashn')  // تاپیک سابسکرایب شده
  handleCarLocation(@Payload() message: any) {
    console.log('📥 پیام دریافتی از MQTT:', message);
  }
}
