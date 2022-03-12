/**
 * Common methods used by multiple roles
 */

import { log } from "../tools/Logger";

export function logCreepStateWarning(creep: Creep): void {
    log.error(`Creep ${creep.name} has unexpected state (${creep.getState()})`, creep.room.name);
}
