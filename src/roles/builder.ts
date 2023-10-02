/**
 * A creep role that constructs structures.
 * @module
 */

import { logUnknownState } from 'utils/creep';

enum State {
  HarvestEnergy = 1,
  BuildConstruction = 2
}

export function run(creep: Creep) {
  if (!creep.hasState()) {
    creep.setState(State.HarvestEnergy);
  }

  switch (creep.memory.state) {
    case State.HarvestEnergy:
      runHarvestEnergy(creep);
      break;
    case State.BuildConstruction:
      runBuildConstruction(creep);
      break;
    default:
      logUnknownState(creep);
      creep.setState(State.HarvestEnergy);
      break;
  }
}

function runHarvestEnergy(creep: Creep) {
  if (creep.isFull) {
    creep.say('🔨Build');
    creep.setState(State.BuildConstruction);
    runBuildConstruction(creep);
    return;
  }

  const source = creep.room.find(FIND_SOURCES)?.[0];
  if (source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
}

function runBuildConstruction(creep: Creep) {
  if (!creep.store[RESOURCE_ENERGY]) {
    creep.say('⚡Harvest');
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
