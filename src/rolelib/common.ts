/**
 * Common instructions that are commonly used by multiple creeps
 */

import { log } from "../tools/Logger";

export function logCreepStateWarning(creep: Creep): void {
    log.error(`Creep ${creep.name} has unexpected state: ${creep.getState()}`, creep.room.name);
}
