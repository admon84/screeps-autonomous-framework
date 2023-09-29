import { error } from 'utils/log';

export function logCreepStateWarning(creep: Creep) {
  error(`Creep ${creep.name} has unexpected state (${creep.memory.state})`, creep.room.name);
}
