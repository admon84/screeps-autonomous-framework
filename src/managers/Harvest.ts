import * as ProfileLib from '../lib/profile';
import * as OrderLib from '../lib/order';
import * as Harvester from '../roles/Harvester';
import { Order } from '../classes/Order';
import { Role } from '../enums/role';
import { Priority } from '../enums/priority';
import { CreepService } from '../services/Creep';
import { RoomService } from '../services/Room';
import { Manager, ManagerPriority } from './_Manager';

export class HarvestManager extends Manager {
  private roomService: RoomService;
  private creepService: CreepService;

  readonly MEMORY_LASTRUN = 'lastRun';

  constructor(roomService: RoomService, creepService: CreepService) {
    super('HarvestManager');
    this.roomService = roomService;
    this.creepService = creepService;
  }

  public run(pri: ManagerPriority) {
    if (pri === ManagerPriority.Low) {
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
    const sources = room.getSources();
    for (const source of sources) {
      this.orderHarvesters(room, source.id, room.name);
    }
  }

  private orderHarvesters(room: Room, sourceId: string, sourceRoom: string) {
    const spawn = room.getSpawn();
    if (!spawn) {
      return;
    }

    const sourceTarget = sourceRoom + '-' + sourceId;
    const active = this.creepService.getCreeps(Role.Harvester, sourceTarget, room.name).length;
    const ordered = OrderLib.getCreepsInQueue(room, Role.Harvester, sourceTarget);

    if (active + ordered === 0) {
      const order = new Order();
      const maxTier = ProfileLib.getMaxTierSimpleWorker(room.energyCapacityAvailable);
      order.body = ProfileLib.getSimpleWorkerBody(maxTier);
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
      OrderLib.orderCreep(room, order);
    }
  }
}
