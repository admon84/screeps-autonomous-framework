/**
 * Operation: Test
 *
 * Operations can be used to created automated "missions"
 * Use this template to create something more useful
 *
 * Victory condition:
 * - Game time reaches set value
 */

import { Priority } from '../enums/priority';
import { Data, VictoryCondition } from './data/TestData';

import { log } from '../utils/logger';

export function run(operation: Data, pri: Priority) {
  if (pri === Priority.Low) {
    if (Game.time % 10 === 0) {
      testMethod(operation);
    }
  }
}

export function victoryConditionReached(operation: Data) {
  if (operation.victoryCondition === VictoryCondition.Gametime) {
    if (Game.time > operation.victoryValue) {
      log.info(`Test Operation finished at tick ${Game.time}`);
      operation.active = false;
      return true;
    }
  }
  return false;
}

function testMethod(operation: Data) {
  if (Game.time > operation.victoryValue) {
    return;
  }
  log.info(`Test Operation is active at tick ${Game.time}`);
}
