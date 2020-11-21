/**
 * Builder
 *
 * Build construction sites into structures
 */

import * as _Common from "../rolelib/common";

enum State {
    HarvestEnergy = 1,
    Construct = 2
}

export function run(creep: Creep) {
    if (!creep.hasState()) {
        creep.setState(State.HarvestEnergy);
    }

    switch (creep.getState()) {
        case State.HarvestEnergy:
            runHarvestEnergy(creep);
            break;
        case State.Construct:
            runConstruct(creep);
            break;
        default:
            _Common.logCreepStateWarning(creep);
            creep.setState(State.HarvestEnergy);
            break;
    }
}

function runHarvestEnergy(creep: Creep) {
    if (creep.isFull()) {
        creep.say("🚧 build");
        creep.setState(State.Construct);
        runConstruct(creep);
        return;
    }

    const sources = creep.room.getSources();
    const targetSource = sources[0];
    if (targetSource instanceof Source) {
        if (creep.harvest(targetSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetSource, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }
}

function runConstruct(creep: Creep) {
    if (creep.isEnergyEmpty()) {
        creep.say("🔄 harvest");
        creep.setState(State.HarvestEnergy);
        runHarvestEnergy(creep);
        return;
    }

    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
    }
}
