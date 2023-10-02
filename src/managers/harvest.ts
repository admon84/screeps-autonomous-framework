import { Order } from 'classes/order';
import { Priority } from 'enums/priority';
import { Role } from 'enums/role';
import { Manager } from 'managers/manager';
import * as Harvester from 'roles/harvester';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
import { getCreepsInQueue, orderCreep } from 'utils/order';
import { getMaxTierSimpleWorker, getSimpleWorkerBody } from 'utils/profile';

/**
 * The `HarvestManager` class orchestrates the energy gathering activities and behaviors of the bot.
 *
 * This class should be utilized whenever you need to control and manage Harvester creeps and their
 * associated tasks within the framework.
 */

export class HarvestManager extends Manager {
  private roomService: RoomService;
  private creepService: CreepService;

  readonly MEMORY_LASTRUN = 'lastRun';

  constructor(roomService: RoomService, creepService: CreepService) {
    super('HarvestManager');
    this.roomService = roomService;
    this.creepService = creepService;
  }

  public run(pri: Priority) {
    if (pri === Priority.Low) {
      this.creepService.runCreeps(Role.Harvester, Harvester.run);

      const lastRun = this.getValue(this.MEMORY_LASTRUN);
      if (!lastRun || lastRun + 20 < Game.time) {
        const rooms = this.roomService.getNormalRooms();
        for (const room of rooms) {
          this.organizeEnergyHarvesting(room);
        }
        this.setValue(this.MEMORY_LASTRUN, Game.time);
      }
    }
  }

  private organizeEnergyHarvesting(room: Room) {
    const sources = room.find(FIND_SOURCES);
    for (const source of sources) {
      this.orderHarvesters(room, source.id, room.name);
    }
  }

  private orderHarvesters(room: Room, sourceId: string, sourceRoom: string) {
    const spawn = room.getMySpawn();
    if (!spawn) {
      return;
    }

    const sourceTarget = sourceRoom + '-' + sourceId;
    const active = this.creepService.getCreeps(Role.Harvester, sourceTarget, room.name).length;
    const ordered = getCreepsInQueue(room, Role.Harvester, sourceTarget);

    if (active + ordered === 0) {
      const order = new Order();
      const maxTier = getMaxTierSimpleWorker(room.energyCapacityAvailable);
      order.body = getSimpleWorkerBody(maxTier);
      if (room.name === sourceRoom) {
        order.priority = Priority.Important;
      } else {
        order.priority = Priority.Standard;
      }
      order.memory = {
        role: Role.Harvester,
        tier: maxTier,
        target: sourceTarget
      };
      orderCreep(room, order);
    }
  }
}
