import { OperationType } from 'enums/operationType';
import * as TestOperation from 'operations/test';
import { info } from 'utils/log';

function setOperationMemory() {
  if (!Memory.operations) {
    Memory.operations = [];
  }
}

function addOperation(operation: OperationData) {
  setOperationMemory();
  Memory.operations.push(operation);
}

export function roomHasActiveTestOperation() {
  setOperationMemory();

  if (Memory.operations.length === 0) {
    return false;
  }

  for (const o of Memory.operations) {
    if (o.active && o.type === OperationType.Test) {
      return true;
    }
  }
  return false;
}

export function createTestOperation(duration = 50) {
  const op = new TestOperation.Data();
  op.type = OperationType.Test;
  op.victoryCondition = TestOperation.VictoryCondition.GameTime;
  op.victoryValue = Game.time + duration;
  addOperation(op);
  info(`Starting Test operation for ${duration} ticks`);
}
