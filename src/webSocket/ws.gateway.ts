import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // اجازه CORS برای ارتباط از فرانت
export class WsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('✅ کلاینت وصل شد:', client.id);
  }

  sendToClients(data: any) {
    this.server.emit('mqtt-data', data); // ارسال دیتا به همه کلاینت‌ها
  }
}
