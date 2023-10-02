import { Order } from 'classes/order';
import { Priority } from 'enums/priority';
import { Role } from 'enums/role';
import { Manager } from 'managers/manager';
import * as Builder from 'roles/builder';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
import { getCreepsInQueue, orderCreep } from 'utils/order';
import { getMaxTierSimpleWorker, getSimpleWorkerBody } from 'utils/profile';

/**
 * The `BuildManager` class orchestrates the build-related activities and behaviors of the bot.
 *
 * This class should be utilized whenever you need to control and manage Builder creeps and their
 * associated tasks within the framework.
 */

export class BuildManager extends Manager {
  private roomService: RoomService;
  private creepService: CreepService;

  readonly MEMORY_LASTRUN = 'lastRun';

  constructor(roomService: RoomService, creepService: CreepService) {
    super('BuildManager');
    this.roomService = roomService;
    this.creepService = creepService;
  }

  public run(pri: Priority) {
    if (pri === Priority.Low) {
      this.creepService.runCreeps(Role.Builder, Builder.run);

      const lastRun = this.getValue(this.MEMORY_LASTRUN);
      if (!lastRun || lastRun + 20 < Game.time) {
        const rooms = this.roomService.getNormalRooms();
        this.organizeStructureBuilding(rooms);
        this.setValue(this.MEMORY_LASTRUN, Game.time);
      }
    }
  }

  private organizeStructureBuilding(rooms: Room[]) {
    for (const room of rooms) {
      this.orderBuilder(room);
    }
  }

  private orderBuilder(room: Room) {
    const active = this.creepService.getCreeps(Role.Builder).length;
    const ordered = getCreepsInQueue(room, Role.Builder);

    if (active + ordered === 0) {
      const order = new Order();
      const maxTier = getMaxTierSimpleWorker(room.energyCapacityAvailable);
      order.body = getSimpleWorkerBody(maxTier);
      order.priority = Priority.Standard;
      order.memory = {
        role: Role.Builder,
        tier: maxTier
      };
      orderCreep(room, order);
    }
  }
}
