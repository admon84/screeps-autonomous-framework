import { Order } from 'classes/order';
import { Role } from 'enums/role';
import { Manager } from 'managers/manager';
import { RoomService } from 'services/room';
import { verbose } from 'utils/log';
import { getUniqueId } from 'utils/order';

/**
 * The `SpawnManager` class orchestrates the spawning of creeps using the priority-based orders queue.
 *
 * This class should be utilized whenever you need to control spawns and their associated logic
 * for creating, renewing and recycling creeps.
 */

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
    const name = Role[order.memory.role] + getUniqueId();

    if (room.name !== spawn.room.name) {
      order.memory.homeroom = room.name;
    }

    const status = spawn.spawnCreep(order.body, name, {
      memory: order.memory
    });

    if (status === OK) {
      verbose(`Spawned: ${Role[order.memory.role]} (${order.memory.target}) - ${name}`, spawn.room.name);
    } else {
      // Log.warning(`Unable to spawn ${Role[order.memory.role]} (status code: ${status})`, spawn.room.name);
      room.memory.orders.unshift(order);
    }
  }
}
