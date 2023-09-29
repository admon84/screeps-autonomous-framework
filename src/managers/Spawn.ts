import { Order } from 'classes/Order';
import { Role } from 'enums/role';
import * as OrderLib from 'lib/order';
import { Manager } from 'managers/_Manager';
import { RoomService } from 'services/Room';
import { log } from 'utils/logger';

export class SpawnManager extends Manager {
  private roomService: RoomService;

  constructor(roomService: RoomService) {
    super('SpawnManager');
    this.roomService = roomService;
  }

  public run() {
    const rooms = this.roomService.getNormalRooms();
    for (const room of rooms) {
      const spawns = room.find(FIND_MY_SPAWNS).filter(s => s.isActive() && !s.spawning);
      if (spawns.length) {
        this.processQueue(room, spawns);
      }
    }
  }

  private processQueue(room: Room, spawns: StructureSpawn[]) {
    if (!room.memory.orders) {
      room.memory.orders = [];
      return;
    }

    const spawn = spawns[0];
    if (!spawn || spawn.spawning || room.memory.orders.length === 0) {
      return;
    }

    room.memory.orders = room.memory.orders.sort((a, b) => a.priority - b.priority);

    const order = room.memory.orders.shift() as Order;
    const name = Role[order.memory.role] + OrderLib.getUniqueId();

    if (room.name !== spawn.room.name) {
      order.memory.homeroom = room.name;
    }

    const status = spawn.spawnCreep(order.body, name, {
      memory: order.memory
    });

    if (status === OK) {
      log.verbose(`Spawned: ${Role[order.memory.role]} (${order.memory.target}) - ${name}`, spawn.room.name);
    } else {
      // log.warning(`Unable to spawn ${Role[order.memory.role]} (status code: ${status})`, spawn.room.name);
      room.memory.orders.unshift(order);
    }
  }
}
