// src/mqtt/mqtt.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;

  onModuleInit() {
    this.connectToBroker();
  }

  private connectToBroker() {
    this.client = mqtt.connect('mqtt://localhost:1883', {
      clientId: 'nest-client-' + Math.random().toString(16).substr(2, 8),
    });

    this.client.on('connect', () => {
      this.client.subscribe('test/hello', (err) => {
        if (err) {
          console.error('❌ Subscription error:', err);
        } else {
          console.log('📡 Subscribed to topic: test/hello');
        }
      });
    });

    this.client.on('message', (topic, message) => {
      console.log(`📨 Message received - Topic: ${topic}, Payload: ${message.toString()}`);
      // اینجا می‌تونی پیام رو به سایر سرویس‌ها یا WebSocket بفرستی
    });

    this.client.on('error', (err) => {
      console.error('❌ MQTT Error:', err);
    });
  }
}
