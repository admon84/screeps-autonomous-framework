/**
 * Upgrader
 *
 * Upgrade Controllers with energy to increase the Controller Level
 */

import * as _Common from "../rolelib/common";

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
        creep.say("⚡ upgrade");
        creep.setState(State.UpgradeController);
        runUpgradeController(creep);
        return;
    }

    const sources = creep.room.getSources();
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
}

function runUpgradeController(creep: Creep) {
    if (creep.isEnergyEmpty()) {
        creep.say("🔄 harvest");
        creep.setState(State.HarvestEnergy);
        runHarvestEnergy(creep);
        return;
    }

    const controller = creep.room.controller;
    if (controller instanceof StructureController) {
        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
        }
    }
}
