/**
 * The creep utility provides helper methods for creeps.
 * @module
 */

import { error } from 'utils/log';

/**
 * Log an error message when a creep has an unknown state.
 */
export function logUnknownState(creep: Creep) {
	error(`Creep ${creep.name} has unexpected state (${creep.memory.state})`, creep.room.name);
}

/**
 * Detect hostiles in range of destination
 * @param destination - The destination to check for hostiles
 * @param range - The range to check for hostiles
 * @returns True if hostiles are present, false otherwise
 * @see https://docs.screeps.com/api/#Room.findInRange
 */
export function hasHostiles(destination: RoomPosition, range: number): boolean {
	return destination.findInRange(FIND_HOSTILE_CREEPS, range).length > 0;
}

// return a random source with 0 hostiles in range
export function getSafeSource(creep: Creep): Source | undefined {
	const sources = creep.room.find(FIND_SOURCES);
	if (sources.length === 0) {
		return;
	}

	const source = sources[Math.floor(Math.random() * sources.length)];
	if (hasHostiles(source.pos, 5)) {
		return;
	}

	return source;
}

// function to pickup dropped energy
export function pickupEnergy(creep: Creep): Boolean {
	const energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.resourceType === RESOURCE_ENERGY
	});
	if (energy) {
		if (creep.pickup(energy) === ERR_NOT_IN_RANGE) {
			creep.moveTo(energy, { visualizePathStyle: { stroke: '#ffaa00' } });
		}
		return true;
	}
	return false;
}
