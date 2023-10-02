import { OperationType } from 'enums/operationType';
import { Priority } from 'enums/priority';
import { Manager } from 'managers/manager';
import * as TestOperation from 'operations/test';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
import { warning } from 'utils/log';

/**
 * The `OperationManager` class orchestrates the administration of operations or special missions.
 *
 * This class should be utilized to implement and perform any new missions.
 *
 * The `RoomService` and `CreepService` are readily available to provide critical infrastructure
 * management to your operation run sequence.
 */

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
          if (op.active && !TestOperation.victoryConditionReached(op)) {
            TestOperation.run(op, pri);
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
        warning(`Removing ${inactive.length} inactive operations.`);
        Memory.operations = Memory.operations.filter(op => op.active);
      }
    }
  }
}
