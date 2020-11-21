import { Manager } from "./_Manager";

import { Role } from "../enums/role";

import { Order } from "../classes/Order";

import * as OrdersUtilities from "../utilities/Orders";

import { RoomService } from "../services/Room";

import { log } from "../tools/Logger";

export class SpawnManager extends Manager {
    private roomService: RoomService;

    constructor(roomService: RoomService) {
        super("SpawnManager");
        this.roomService = roomService;
    }

    public run(): void {
        const rooms = this.roomService.getNormalRooms();
        for (const room of rooms) {
            const spawns = _.filter(room.getMySpawns(), function (s: StructureSpawn) {
                return s.isActive() && !s.spawning;
            });
            if (spawns.length) {
                this.processQueue(room, spawns);
            }
        }
    }

    private processQueue(room: Room, spawns: StructureSpawn[]): void {
        if (room.memory.orders === undefined) {
            room.memory.orders = [];
            return;
        }

        const spawn = spawns[0];
        if (spawns.length === 0 || spawn.spawning || room.memory.orders.length === 0) {
            return;
        }

        room.memory.orders.sort(function (a: Order, b: Order) {
            return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
        });

        const order = room.memory.orders.shift() as Order;
        const name = OrdersUtilities.makeRoleName(order.memory.role) + "#" + OrdersUtilities.makeRandomCreepId();

        if (room.name !== spawn.room.name) {
            order.memory.homeroom = room.name;
        }

        const status = spawn.spawnCreep(order.body, name, {
            memory: order.memory
        });

        if (status === OK) {
            log.verbose(
                `Spawned ${Role[order.memory.role]} named ${name} (target: ${order.memory.target})`,
                spawn.room.name
            );
        } else {
            // log.alert(`Unable to spawn ${Role[order.memory.role]} (status code: ${status})`, spawn.room.name);
            room.memory.orders.unshift(order);
        }
    }
}
