/**
 * A creep role responsible for collecting energy.
 * @module
 */

import { logUnknownState, hasHostiles, getSafeSource } from 'utils/creep';

enum State {
	HarvestEnergy = 1,
	TransferEnergy = 2
}

export function run(creep: Creep) {
	if (!creep.hasState()) {
		creep.setState(State.HarvestEnergy);
	}

	switch (creep.memory.state) {
		case State.HarvestEnergy:
			runHarvestEnergy(creep);
			break;
		case State.TransferEnergy:
			runTransferEnergy(creep);
			break;
		default:
			logUnknownState(creep);
			creep.setStateAndRun(State.HarvestEnergy, runHarvestEnergy);
			break;
	}
}

function runHarvestEnergy(creep: Creep) {
	if (creep.isFull) {
		creep.say('💫Transfer');
		creep.setStateAndRun(State.TransferEnergy, runTransferEnergy);
		return;
	}
	// if there's a tombstone nearby, grab its resources
	const tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
		filter: tombstone => tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
	});
	// and pickup loose energy
	const energy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.resourceType === RESOURCE_ENERGY
	});
	const source = getTargetSource(creep);

	if (tombstone) {
		if (creep.withdraw(tombstone, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
			creep.moveTo(tombstone, { visualizePathStyle: { stroke: '#ffaa00' } });
		}
		return;
	} else {
		if (energy) {
			if (creep.pickup(energy) === ERR_NOT_IN_RANGE) {
				creep.moveTo(energy, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
			return;
		}

		if (source) {
			if (hasHostiles(source.pos, 5)) {
				creep.say('🚨Hostile');
				// recycle the creep at spawn
				creep.say('🔄Recycle');
				if (creep.room.find(FIND_MY_SPAWNS)?.[0].recycleCreep(creep) === ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.find(FIND_MY_SPAWNS)?.[0], { visualizePathStyle: { stroke: '#ff0000' } });
				}
				return;
			}
			if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: { stroke: '#8b0000' } });
			}
		}
	}
}

function runTransferEnergy(creep: Creep) {
	if (!creep.store[RESOURCE_ENERGY]) {
		creep.say('⚡Harvest');
		creep.setStateAndRun(State.HarvestEnergy, runHarvestEnergy);
		return;
	}

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
	else { // we can also help build
		const targetConstructionSite = creep.room.find(FIND_CONSTRUCTION_SITES)?.[0];
		if (targetConstructionSite) {
			if (creep.build(targetConstructionSite) === ERR_NOT_IN_RANGE) {
				creep.say('🔨Build');
				creep.moveTo(targetConstructionSite, { visualizePathStyle: { stroke: '#ffff00' } });
			}
		}
	}
}

function getTargetSource(creep: Creep) {
	if (!creep.memory.source && creep.memory.target) {
		creep.memory.source = creep.memory.target.split('-')[1] as Id<Source>;
	}
	if (!creep.memory.source) {
		return null;
	}
	return Game.getObjectById(creep.memory.source);
}
