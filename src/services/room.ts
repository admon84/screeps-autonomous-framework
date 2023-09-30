/**
 * RoomService
 *
 * Organizes rooms by their room type, used in Managers and Operations
 */
import { RoomType } from 'enums/roomType';

type RoomDictionary = Record<RoomType, Room[]>;

export class RoomService {
  private roomDictionary: RoomDictionary;

  constructor() {
    this.roomDictionary = this.makeDictionary();
  }

  public getNormalRooms() {
    const rooms: Room[] = [];
    if (this.roomDictionary[RoomType.Normal]) {
      rooms.push(...this.roomDictionary[RoomType.Normal]);
    }
    return rooms;
  }

  protected makeDictionary() {
    const rooms: RoomDictionary = {
      [RoomType.Normal]: []
    };

    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];

      if (!room.controller || !room.controller.my || room.controller.level < 1) {
        continue;
      }

      if (!room.memory.t) {
        room.memory.t = RoomType.Normal;
      }

      if (!rooms[room.memory.t]) {
        rooms[room.memory.t] = [];
      }
      rooms[room.memory.t].push(room);
    }
    return rooms;
  }
}
