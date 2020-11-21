/**
 * Harvester
 *
 * Harvest energy from Sources and transfer it to structures
 */

import { log } from "../tools/Logger";

enum State {
    HarvestEnergy = 1,
    TransferEnergy = 2
}

export function run(creep: Creep) {
    if (!creep.hasState()) {
        creep.setState(State.HarvestEnergy);
    }

    switch (creep.getState()) {
        case State.HarvestEnergy:
            runHarvestEnergy(creep);
            break;
        case State.TransferEnergy:
            runTransferEnergy(creep);
            break;
        default:
            log.error(`Creep ${creep.name} has unkown state: ${creep.getState()}`, creep.room.name);
            creep.setState(State.HarvestEnergy);
            break;
    }
}

function runHarvestEnergy(creep: Creep) {
    if (creep.isFull()) {
        creep.setState(State.TransferEnergy);
        creep.say("⚡ transfer");
        return;
    }

    const source = getTargetSource(creep);
    if (source instanceof Source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }
}

function runTransferEnergy(creep: Creep) {
    if (creep.isEnergyEmpty()) {
        creep.setState(State.HarvestEnergy);
        creep.say("🔄 harvest");
        return;
    }

    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
            return (
                (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
        }
    }) as Structure[];

    if (targets.length) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
    }
}

function getTargetSource(creep: Creep): Source | null {
    if (creep.memory.source === undefined) {
        creep.memory.source = creep.memory.target.split("-")[1];
    }
    return Game.getObjectById(creep.memory.source) as Source;
}
