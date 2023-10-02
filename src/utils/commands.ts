/**
 * The commands utility provides global commands for the Screeps game console.
 * @module
 */

import { error } from 'utils/log';
import { createTestOperation, isTestOperationActive } from 'utils/operation';

declare global {
  /* eslint-disable no-var */

  /**
   * A global command to create a Test operation from the Screeps game console.
   * @param duration (optional) The amount of time the operation will be active.
   */
  var addTestOperation: (duration?: number) => string | void;

  /* eslint-enable no-var */
}

/**
 * Return log messages to the console instead of calling `console.log()`.
 */
const print = false;

global.addTestOperation = (duration = 50) => {
  if (duration < 10) {
    return error('Test operation duration must be at least 10 ticks.', null, print);
  }
  if (isTestOperationActive()) {
    return error('Test operation is already active.', null, print);
  }
  return createTestOperation(duration, print);
};
