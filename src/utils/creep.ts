/**
 * The creep utility provides helper methods for creeps.
 * @module
 */

import { error } from 'utils/log';

/**
 * Log an error message when a creep has an unknown state.
 */
export function logUnknownState(creep: Creep) {
  error(`Creep ${creep.name} has unexpected state (${creep.memory.state})`, creep.room.name);
}
