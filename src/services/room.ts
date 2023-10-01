import { RoomType } from 'enums/roomType';

// An object to organize owned rooms by type.
type RoomDictionary = Record<RoomType, Room[]>;

/**
 * A class to facilitate accessing owned rooms by type.
 */
export class RoomService {
  /**
   * An object containing all owned rooms indexed by type.
   */
  private roomDictionary: RoomDictionary;

  constructor() {
    this.roomDictionary = this.makeDictionary();
  }

  /**
   * Fetches all owned rooms with the Normal room type.
   */
  public getNormalRooms() {
    const rooms: Room[] = [];
    if (this.roomDictionary[RoomType.Normal]) {
      rooms.push(...this.roomDictionary[RoomType.Normal]);
    }
    return rooms;
  }

  /**
   * Creates an object of all owned rooms indexed by type using `Game.rooms`.
   */
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
