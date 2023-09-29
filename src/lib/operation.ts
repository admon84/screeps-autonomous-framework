import { OperationType } from 'enums/operationtype';
import * as TestData from 'operations/data/TestData';
import { IOperationData } from 'operations/data/_OperationData';
import * as Log from 'utils/log';

function addOperation(operation: IOperationData) {
  if (!Memory.operations) {
    Memory.operations = [];
  }
  Memory.operations.push(operation);
}

export function roomHasActiveTestOperation() {
  if (!Memory.operations) {
    Memory.operations = [];
  }

  if (Memory.operations.length === 0) {
    return false;
  }

  for (const o of Memory.operations) {
    if (o.active && o.operationtype === OperationType.Test) {
      return true;
    }
  }
  return false;
}

export function createTestOperation() {
  const op = new TestData.Data();
  op.operationtype = OperationType.Test;
  op.victoryCondition = TestData.VictoryCondition.Gametime;
  op.victoryValue = Game.time + 50;
  addOperation(op);
  Log.info('Running Test operation for 50 ticks');
  return true;
}
