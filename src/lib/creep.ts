import { log } from 'utils/logger';

export function logCreepStateWarning(creep: Creep) {
  log.error(`Creep ${creep.name} has unexpected state (${creep.memory.state})`, creep.room.name);
}
