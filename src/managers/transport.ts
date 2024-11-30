import { Order } from 'classes/order';
import { Priority } from 'enums/priority';
import { Role } from 'enums/role';
import { Manager } from 'managers/manager';
import * as Hauler from 'roles/hauler';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
import { getCreepsInQueue, orderCreep } from 'utils/order';
import { getMaxTierSimpleWorker, getSimpleWorkerBody } from 'utils/profile';
/**
 * The `TransportManager` class orchestrates the energy movement activities and behaviors of the bot.
 *
 * This class should be utilized whenever you need to control and manage Hauler creeps and their
 * associated tasks within the framework.
 */

export class TransportManager extends Manager {
	private roomService: RoomService;
	private creepService: CreepService;

	readonly MEMORY_LASTRUN = 'lastRun';

	constructor(roomService: RoomService, creepService: CreepService) {
		super('TransportManager');
		this.roomService = roomService;
		this.creepService = creepService;
	}

	public run(pri: Priority): void {
		if (pri === Priority.Low) {
			this.creepService.runCreeps(Role.Hauler, Hauler.run);
			const lastRun = this.getValue(this.MEMORY_LASTRUN);
			if (!lastRun || lastRun + 20 < Game.time) {
				const rooms = this.roomService.getNormalRooms();
				for (const room of rooms) {
					this.organizeEnergyHauling(room);
				}
				this.setValue(this.MEMORY_LASTRUN, Game.time);
			}
		}
	}

	private organizeEnergyHauling(room: Room) {
		const containers = room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0,
		});
		for (const container of containers) {
			this.orderHaulers(room, container.id, room.name);
		}
	}

	private orderHaulers(room: Room, containerId: string,
		sourceRoom: string) {
		const spawn = room.getMySpawn();
		if (!spawn) {
			return;
		}

		const containers = room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0,
		});

		const containerTarget = sourceRoom + '-' + containerId;
		const active = this.creepService.getCreeps(Role.Hauler, containerTarget, room.name).length;
		const ordered = getCreepsInQueue(room, Role.Hauler, containerTarget);

		if (active + ordered === 0) {
			const order = new Order();
			const maxTier = getMaxTierSimpleWorker(room.energyCapacityAvailable);
			order.body = getSimpleWorkerBody(maxTier);
			if (room.name === sourceRoom) {
				order.priority = Priority.Important;
			} else {
				order.priority = Priority.Standard;
			}
			order.memory = {
				role: Role.Hauler,
				tier: maxTier,
				target: containerTarget
			};
			orderCreep(room, order);
		}
	}
}
