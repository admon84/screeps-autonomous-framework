import * as OperationTest from '../operations/Test';
import { CreepService } from '../services/Creep';
import { RoomService } from '../services/Room';
import { OperationType } from '../enums/operationtype';
import { Priority } from '../enums/priority';
import { log } from '../utils/logger';
import { Manager } from './_Manager';

export class OperationManager extends Manager {
  private roomService: RoomService;
  private creepService: CreepService;

  readonly MEMORY_MAINTAIN = 'lastRunMaintain';

  constructor(roomService: RoomService, creepService: CreepService) {
    super('OperationManager');
    this.roomService = roomService;
    this.creepService = creepService;
  }

  public run(pri: Priority) {
    if (pri === Priority.Trivial) {
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
        // The Test operation is a minimal example
        case OperationType.Test:
          if (op.active && !OperationTest.victoryConditionReached(op)) {
            OperationTest.run(op, pri);
          } else {
            op.active = false;
          }
          break;
        // Any new operations can be added to this switch
      }
    }
  }

  private deleteOldOperations() {
    if (Memory.operations) {
      const inactive = Memory.operations.filter(op => !op.active);
      log.warning(`Removing ${inactive.length} inactive operations`);
      Memory.operations = Memory.operations.filter(op => op.active);
    }
  }
}
