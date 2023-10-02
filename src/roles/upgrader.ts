/**
 * A creep role that works on upgrading the controller.
 * @module
 */

import { logUnknownState } from 'utils/creep';

enum State {
  HarvestEnergy = 1,
  UpgradeController = 2
}

export function run(creep: Creep) {
  if (!creep.hasState()) {
    creep.setState(State.HarvestEnergy);
  }

  switch (creep.memory.state) {
    case State.HarvestEnergy:
      runHarvestEnergy(creep);
      break;
    case State.UpgradeController:
      runUpgradeController(creep);
      break;
    default:
      logUnknownState(creep);
      creep.setState(State.HarvestEnergy);
      break;
  }
}

function runHarvestEnergy(creep: Creep) {
  if (creep.isFull) {
    creep.say('🙏Upgrade');
    creep.setState(State.UpgradeController);
    runUpgradeController(creep);
    return;
  }

  const source = creep.room.find(FIND_SOURCES)?.[0];
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
  }
}

function runUpgradeController(creep: Creep) {
  if (!creep.store[RESOURCE_ENERGY]) {
    creep.say('⚡Harvest');
    creep.setState(State.HarvestEnergy);
    runHarvestEnergy(creep);
    return;
  }

  const { controller } = creep.room;
  if (controller) {
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
}
