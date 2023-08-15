import { RoomService } from '../services/Room';
import { Manager } from './_Manager';
import { Priority } from '../enums/priority';

export class TowerManager extends Manager {
  private roomService: RoomService;

  readonly MEMORY_LASTRUN = 'lastRun';

  constructor(roomService: RoomService) {
    super('TowerManager');
    this.roomService = roomService;
  }

  public run(pri: Priority) {
    if (pri === Priority.Critical) {
      const normalRooms = this.roomService.getNormalRooms();
      for (const room of normalRooms) {
        this.controlTowers(room);
      }
    }
  }

  private controlTowers(room: Room) {
    const towersWithEnergy = room.find<StructureTower>(FIND_STRUCTURES, {
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
