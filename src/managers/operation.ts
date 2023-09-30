import { OperationType } from 'enums/operationType';
import { Priority } from 'enums/priority';
import { Manager } from 'managers/_manager';
import * as OperationTest from 'operations/test';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
import { warning } from 'utils/log';

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
      switch (op.type) {
        case OperationType.Test:
          // Note: The Test operation is a minimal example
          if (op.active && !OperationTest.victoryConditionReached(op)) {
            OperationTest.run(op, pri);
          } else {
            op.active = false;
          }
          break;
      }
    }
  }

  private deleteOldOperations() {
    if (Memory.operations) {
      const inactive = Memory.operations.filter(op => !op.active);
      if (inactive.length > 0) {
        warning(`Removing ${inactive.length} inactive operations`);
        Memory.operations = Memory.operations.filter(op => op.active);
      }
    }
  }
}
