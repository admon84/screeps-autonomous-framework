/**
 * The operation utility provides methods for handling special missions.
 * @module
 */

import { OperationType } from 'enums/operationType';
import * as TestOperation from 'operations/test';
import { success } from 'utils/log';

/**
 * Initialize bot operations memory.
 */
function initOperations() {
  if (!Memory.operations) {
    Memory.operations = [];
  }
}

/**
 * Insert a new operation into memory.
 * @param operation The data of the new operation.
 */
function addOperation(operation: OperationData) {
  initOperations();
  Memory.operations.push(operation);
}

/**
 * Checks if a Test operation is currently active.
 */
export function isTestOperationActive() {
  initOperations();

  if (Memory.operations.length === 0) {
    return false;
  }

  for (const op of Memory.operations) {
    if (op.active && op.type === OperationType.Test) {
      return true;
    }
  }
  return false;
}

/**
 * Creates a Test operation for a specified amount of time.
 * @param duration (optional) The amount of time the operation will be active.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function createTestOperation(duration = 50, print = true) {
  const op = new TestOperation.Data();
  op.type = OperationType.Test;
  op.victoryCondition = TestOperation.VictoryCondition.GameTime;
  op.victoryValue = Game.time + duration;
  addOperation(op);
  return success(`Test operation started at ${Game.time} for ${duration} ticks.`, null, print);
}
