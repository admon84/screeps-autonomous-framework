/**
 * RoomService
 *
 * Organizes rooms by their room type, used in Managers and Operations
 */
import { Roomtype } from '../enums/roomtype';

export class RoomService {
  private roomDictionary: { [type: number]: Room[] };

  constructor() {
    this.roomDictionary = this.makeDictionary();
  }

  public getNormalRooms() {
    const rooms: Room[] = [];
    if (this.roomDictionary[Roomtype.Normal]) {
      rooms.push(...this.roomDictionary[Roomtype.Normal]);
    }
    return rooms;
  }

  private makeDictionary() {
    const rooms: { [type: number]: Room[] } = {};
    rooms[Roomtype.Normal] = [];

    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];

      if (!room.controller || !room.controller.my || room.controller.level < 1) {
        continue;
      }

      if (!room.memory.t) {
        room.memory.t = Roomtype.Normal;
      }

      if (!rooms[room.memory.t]) {
        rooms[room.memory.t] = [];
      }
      rooms[room.memory.t].push(room);
    }
    return rooms;
  }
}
