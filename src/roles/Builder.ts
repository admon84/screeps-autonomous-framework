/**
 * Builder
 *
 * Build construction sites into structures
 */

import * as _Common from '../rolelib/common';

enum State {
  HarvestEnergy = 1,
  BuildConstruction = 2
}

export function run(creep: Creep) {
  if (!creep.hasState()) {
    creep.setState(State.HarvestEnergy);
  }

  switch (creep.getState()) {
    case State.HarvestEnergy:
      runHarvestEnergy(creep);
      break;
    case State.BuildConstruction:
      runBuildConstruction(creep);
      break;
    default:
      _Common.logCreepStateWarning(creep);
      creep.setState(State.HarvestEnergy);
      break;
  }
}

function runHarvestEnergy(creep: Creep) {
  if (creep.isFull()) {
    creep.say('🔧Build');
    creep.setState(State.BuildConstruction);
    runBuildConstruction(creep);
    return;
  }

  const source = creep.room.getSources()?.[0];
  if (source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
}

function runBuildConstruction(creep: Creep) {
  if (!creep.hasEnergy()) {
    creep.say('⛏️Harvest');
    creep.setState(State.HarvestEnergy);
    runHarvestEnergy(creep);
    return;
  }

  const constructionSite = creep.room.find(FIND_CONSTRUCTION_SITES)?.[0];
  if (constructionSite) {
    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
}
