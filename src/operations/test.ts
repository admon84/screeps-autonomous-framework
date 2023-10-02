/**
 * Operations can be used to facilitate special missions. This operation provides an example template.
 * @module
 */

import { OperationType } from 'enums/operationType';
import { Priority } from 'enums/priority';
import { info, success } from 'utils/log';

/**
 * Conditions to indicate the operation is complete.
 */
export enum VictoryCondition {
  GameTime = 1
}

/**
 * Memory data used for the operation.
 */
export class Data implements OperationData {
  type: OperationType = OperationType.Test;
  active = true;
  victoryCondition: VictoryCondition;
  victoryValue: number;
}

/**
 * Perform tasks while the operation is active.
 */
export function run(operation: Data, pri: Priority) {
  if (pri === Priority.Low) {
    if (Game.time % 10 === 0) {
      helloWorld(operation);
    }
  }
}

/**
 * Check if the operation has been completed.
 */
export function victoryConditionReached(operation: Data) {
  if (operation.victoryCondition === VictoryCondition.GameTime) {
    if (Game.time > operation.victoryValue) {
      success(`Test operation finished at ${Game.time}.`);
      operation.active = false;
      return true;
    }
  }
  return false;
}

function helloWorld(operation: Data) {
  if (Game.time > operation.victoryValue) {
    return;
  }
  info(`Test operation is active for ${operation.victoryValue - Game.time} more ticks.`);
}
