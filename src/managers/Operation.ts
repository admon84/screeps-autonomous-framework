import * as OperationTest from '../operations/Test';
import { CreepService } from '../services/Creep';
import { RoomService } from '../services/Room';
import { OperationType } from '../enums/operationtype';
import { log } from '../utils/logger';
import { Manager, ManagerPriority } from './_Manager';

export class OperationManager extends Manager {
  private roomService: RoomService;
  private creepService: CreepService;

  readonly MEMORY_MAINTAIN = 'maintain';

  constructor(roomService: RoomService, creepService: CreepService) {
    super('OperationManager');
    this.roomService = roomService;
    this.creepService = creepService;
  }

  public run(pri: ManagerPriority) {
    if (pri === ManagerPriority.Trivial) {
      const lastRunMaintain = this.getValue(this.MEMORY_MAINTAIN);
      if (!lastRunMaintain || lastRunMaintain + 1000 < Game.time) {
        this.deleteOldOperations();
        this.setValue(this.MEMORY_MAINTAIN, Game.time);
      }
    }

    if (!Memory.operations) {
      Memory.operations = [];
    }

    for (const op of Memory.operations) {
      switch (op.operationtype) {
        // This is the Test Operation example
        case OperationType.Test:
          if (op.active && !OperationTest.victoryConditionReached(op)) {
            OperationTest.run(op, pri);
          } else {
            op.active = false;
          }
          break;
        // Other operations can be added here
      }
    }
  }

  private deleteOldOperations() {
    if (Memory.operations) {
      const inactive = Memory.operations.filter(op => !op.active);
      log.error(`Removing ${inactive.length} inactive operations.`);
      Memory.operations = Memory.operations.filter(op => op.active);
    }
  }
}
