import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MachinesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateMachine')
  handleUpdateMachine(client, payload) {
    this.server.emit('machineUpdated', payload);
  }
}
