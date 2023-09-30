/**
 * Operation: Test
 *
 * Operations can be used to created automated "missions"
 * Use this template to create something more useful
 *
 * Victory condition:
 * - Game time reaches set value
 */

import { OperationType } from 'enums/operationType';
import { Priority } from 'enums/priority';
import { info } from 'utils/log';

export enum VictoryCondition {
  GameTime = 1
}

export class Data implements OperationData {
  type: OperationType = OperationType.Test;
  active = true;
  victoryCondition: VictoryCondition;
  victoryValue: number;
}

export function run(operation: Data, pri: Priority) {
  if (pri === Priority.Low) {
    if (Game.time % 10 === 0) {
      helloWorld(operation);
    }
  }
}

export function victoryConditionReached(operation: Data) {
  if (operation.victoryCondition === VictoryCondition.GameTime) {
    if (Game.time > operation.victoryValue) {
      info(`Test Operation finished at ${Game.time}`);
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
  info(`Test Operation is active for ${operation.victoryValue - Game.time} ticks`);
}
