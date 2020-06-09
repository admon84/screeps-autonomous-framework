import {Roomtype} from "../enums/roomtype";

export class RoomService {

    private roomDictionary: {[type: number]: Room[]};

    constructor() {
        this.roomDictionary = this.makeDictionary();
    }

    public getNormalRooms(): Room[] {
        let rooms: Room[] = [];
        if (this.roomDictionary[Roomtype.Normal] !== undefined) {
            rooms.push(...this.roomDictionary[Roomtype.Normal]);
        }
        return rooms;
    }

    private makeDictionary(): {[type: number]: Room[]} {
        let rooms: {[type: number]: Room[]} = {};
        rooms[Roomtype.Normal] = [];

        for (let roomName in Game.rooms) {
            let room = Game.rooms[roomName];
            if (room.controller === undefined || !room.controller.my || room.controller.level < 1) {
                continue;
            }

            if (room.memory.t === undefined) {
                room.memory.t = Roomtype.Normal;
            }
            
            if (rooms[room.memory.t] === undefined){
                rooms[room.memory.t] = [];
            }
            rooms[room.memory.t].push(room);
        }
        return rooms;
    }
}
