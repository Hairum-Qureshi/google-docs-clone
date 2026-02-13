import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class CollaborationGateway {
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    client.emit('connected', {
      message: 'Successfully connected to WebSocket gateway',
      socketId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
