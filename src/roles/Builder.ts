/**
 * Builder
 *
 * Build construction sites into structures
 */

import { log } from "../tools/Logger";

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
            log.error(`Creep ${creep.name} has unkown state: ${creep.getState()}`, creep.room.name);
            creep.setState(State.HarvestEnergy);
            break;
    }
}

function runHarvestEnergy(creep: Creep) {
    if (creep.isFull()) {
        creep.setState(State.Construct);
        creep.say("🚧 build");
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
        creep.setState(State.HarvestEnergy);
        creep.say("🔄 harvest");
        return;
    }

    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
    }
}
