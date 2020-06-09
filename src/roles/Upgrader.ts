/**
 * Upgrader
 *
 * Upgrade Controllers with energy to increase the Controller Level
 */

import {log} from "../tools/Logger";

enum State {
    HarvestEnergy = 1,
    UpgradeController = 2,
}

export function run(creep: Creep) {
    if (!creep.hasState()) {
        creep.setState(State.HarvestEnergy);
    }

    switch(creep.getState()) {
        case State.HarvestEnergy:
            runHarvestEnergy(creep);
            break;
        case State.UpgradeController:
            runUpgradeController(creep);
            break;
        default:
            log.error(`Creep ${creep.name} has unkown state: ${creep.getState()}`, creep.room.name);
            creep.setState(State.HarvestEnergy);
            break;
    }
}

function runHarvestEnergy(creep: Creep) {
    if (creep.isFull()) {
        creep.setState(State.UpgradeController);
        creep.say('⚡ upgrade');
        return;
    }

    const sources = creep.room.getSources();
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

function runUpgradeController(creep: Creep) {
    if (creep.isEnergyEmpty()) {
        creep.setState(State.HarvestEnergy);
        creep.say('🔄 harvest');
        return;
    }

    let controller = creep.room.controller;
    if (controller instanceof StructureController) {
        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}