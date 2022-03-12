import { Roomtype } from "../enums/roomtype";

export class RoomService {
    private roomDictionary: { [type: number]: Room[] };

    constructor() {
        this.roomDictionary = this.makeDictionary();
    }

    public getNormalRooms() {
        const rooms: Room[] = [];
        if (this.roomDictionary[Roomtype.Normal] !== undefined) {
            rooms.push(...this.roomDictionary[Roomtype.Normal]);
        }
        return rooms;
    }

    private makeDictionary() {
        const rooms: { [type: number]: Room[] } = {};
        rooms[Roomtype.Normal] = [];

        for (const roomName in Game.rooms) {
            const room = Game.rooms[roomName];
            if (room.controller === undefined || !room.controller.my || room.controller.level < 1) {
                continue;
            }

            if (room.memory.t === undefined) {
                room.memory.t = Roomtype.Normal;
            }

            if (rooms[room.memory.t] === undefined) {
                rooms[room.memory.t] = [];
            }
            rooms[room.memory.t].push(room);
        }
        return rooms;
    }
}
