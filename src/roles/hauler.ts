/**
 * A creep role responsible for transferring energy.
 * @module
 */

import { logUnknownState } from 'utils/creep';

enum State {
	TransferEnergy = 1,
	HarvestEnergy = 2
}

export function run(creep: Creep) {
	if (!creep.hasState()) {
		creep.setState(State.TransferEnergy);
	}

	switch (creep.memory.state) {
		case State.TransferEnergy:
			runTransferEnergy(creep);
			break;
		default:
			logUnknownState(creep);
			creep.setStateAndRun(State.TransferEnergy, runTransferEnergy);
			break;
	}
}

function runTransferEnergy(creep: Creep) {
	if (creep.isFull) {
		creep.say('💫Transfer');
		const targetStructure = creep.room.find(FIND_STRUCTURES, {
			filter: structure =>
				(structure.structureType === STRUCTURE_EXTENSION ||
					structure.structureType === STRUCTURE_SPAWN ||
					structure.structureType === STRUCTURE_TOWER) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		})?.[0];

		if (targetStructure) {
			if (creep.transfer(targetStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(targetStructure, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
		return;
	}
	const containers = creep.room.find(FIND_STRUCTURES, {
		filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0),
	});
	const targets = creep.room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN),
	});
	if (containers.length === 0) {

	};
	for (const container of containers) {

		if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
			creep.moveTo(container);
		} else {
			const target = targets.find((target) => {
				if ('store' in target) {
					return (target.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
				}
			});
			if (!target) continue;
			if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
			return;
		}
	}


}

