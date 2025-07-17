// src/events/events.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*', credentials: false } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`✅ Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('client-message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(`📨 Message from ${client.id}:`, data);

    // Broadcast to all clients
    this.server.emit('server-message', `Server got: ${data}`);
  }

  // تابع برای ارسال پیام از سرویس دیگه
  sendToAllClients(data: any) {
    this.server.emit('server-message', data);
  }
}