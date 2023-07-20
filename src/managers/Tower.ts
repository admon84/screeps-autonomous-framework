import { RoomService } from '../services/Room';
import { Manager, ManagerPriority } from './_Manager';

export class TowerManager extends Manager {
  private roomService: RoomService;

  readonly MEMORY_LASTRUN = 'lastRun';

  constructor(roomService: RoomService) {
    super('TowerManager');
    this.roomService = roomService;
  }

  public run(pri: ManagerPriority) {
    if (pri === ManagerPriority.Critical) {
      const normalRooms = this.roomService.getNormalRooms();
      for (const room of normalRooms) {
        this.controlTowers(room);
      }
    }
  }

  private controlTowers(room: Room) {
    const towersWithEnergy: StructureTower[] = room.find(FIND_STRUCTURES, {
      filter: structure =>
        structure.structureType === STRUCTURE_TOWER && structure.store[RESOURCE_ENERGY] > TOWER_ENERGY_COST
    });

    for (const tower of towersWithEnergy) {
      const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }
    }
  }
}
