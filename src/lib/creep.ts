import * as Log from 'utils/log';

export function logCreepStateWarning(creep: Creep) {
  Log.error(`Creep ${creep.name} has unexpected state (${creep.memory.state})`, creep.room.name);
}
