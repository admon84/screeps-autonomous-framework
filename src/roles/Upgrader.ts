/**
 * Upgrader
 *
 * Upgrades the room controller
 */

import * as _Common from '../rolelib/common';

enum State {
  HarvestEnergy = 1,
  UpgradeController = 2
}

export function run(creep: Creep) {
  if (!creep.hasState()) {
    creep.setState(State.HarvestEnergy);
  }

  switch (creep.getState()) {
    case State.HarvestEnergy:
      runHarvestEnergy(creep);
      break;
    case State.UpgradeController:
      runUpgradeController(creep);
      break;
    default:
      _Common.logCreepStateWarning(creep);
      creep.setState(State.HarvestEnergy);
      break;
  }
}

function runHarvestEnergy(creep: Creep) {
  if (creep.isFull()) {
    creep.say('🙏Upgrade');
    creep.setState(State.UpgradeController);
    runUpgradeController(creep);
    return;
  }

  const source = creep.room.getSources()?.[0];
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
