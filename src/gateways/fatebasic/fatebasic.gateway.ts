import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FateBasicInterface } from './fatebasic.interface';

@WebSocketGateway({ namespace: '/fate-basic', cors: true })
export class FatebasicGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  rooms = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: FateBasicInterface) {
    this.server.to(data.room).emit('events', data);
  }

  @SubscribeMessage('getExistingRooms')
  handleGetExistingRooms(@ConnectedSocket() client: Socket) {
    client.emit('existingRooms', this.rooms);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any
  ) {
    console.log(data);
    const obj = {
      room: data.room,
      game: data.game,
      joined: data.joined,
    };
    this.rooms.push(obj);
    //console.log(this.rooms);
    client.emit('existingRooms', this.rooms);
    this.server.emit('createdRoom', `A sala ${data.room} foi criada`);
  }

  @SubscribeMessage('deleteRoom')
  handleDeleteRoom(@MessageBody() room: string) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].room == room) {
        this.rooms.splice(i, 1);
        //console.log(this.rooms);
        break;
      }
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    for (let i = 0; i < this.rooms.length; i++) {
      console.log('oi');
      console.log(data);
      console.log(this.rooms[i].room);
      if (this.rooms[i].room == data.room) {
        console.log('oi');
        const roomData = this.rooms[i];

        if (roomData.joined.includes(data.user_id)) {
          client.emit('alreadyJoinedRoom', data?.room);
          return;
        }

        if (roomData.joined.length >= 16) {
          client.emit('roomFull', data?.room);
          return;
        }

        if (
          !roomData.joined.includes(client.id) &&
          roomData.joined.length < 16 &&
          data.room
        ) {
          roomData.joined.push(data.user_id);
          //console.log(roomData.joined);
          //console.log(client);
          //console.log(data.user_id);
          //console.log(data.room);
          client.join(data.room);
          client.emit('joinedRoom', roomData);
          return;
        } else {
          client.emit('roomNotFound', data.room);
          return;
        }
      }
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    if (data) {
      for (let i = 0; i < this.rooms.length; i++) {
        for (let j = 0; j < this.rooms[i].joined.length; j++) {
          if (this.rooms[i].joined[j] === data.user_id) {
            this.rooms[i].joined.splice(j, 1);
            break; // Encerra o loop interno após remover o usuário
          }
        }
      }
      client.leave(data?.room);
      client.emit('leftRoom', data.room);
      //console.log('Usuário removido da sala');
    }
  }

  @SubscribeMessage('diceRoll')
  handleDiceRoll(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(client);
    console.log(data);
    this.server.to(data.room).emit('diceRolled', data);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(client);
    console.log(args);
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log(client);
    console.log('User disconnected');
  }

  afterInit(server: any) {
    console.log(server);
    console.log('Socket is live');
  }
}
