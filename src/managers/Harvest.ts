import * as ProfileUtilities from "../utilities/Profiles";

import * as Harvester from "../roles/Harvester";

import {Order} from "../classes/Order";

import * as OrdersRepository from "../repository/Orders";

import {Role} from "../enums/role";
import {Priority} from "../enums/priority";

import {Manager, ManagerPriority} from "./_Manager";

import {CreepService} from "../services/Creep";
import {RoomService} from "../services/Room";

export class HarvestManager extends Manager {

    private roomService: RoomService;
    private creepService: CreepService;

    readonly MEMORY_LASTRUN = "lastRun";

    constructor(roomService: RoomService, creepService: CreepService) {
        super("HarvestManager");
        this.roomService = roomService;
        this.creepService = creepService;
    }

    public run (pri: ManagerPriority): void {
        if (pri === ManagerPriority.Low) {
            this.creepService.runCreeps(Role.Harvester, Harvester.run);
            
            const lastRun = this.getValue(this.MEMORY_LASTRUN);
            if (lastRun === undefined || lastRun + 20 < Game.time) {
                const rooms = this.roomService.getNormalRooms();
                for (let room of rooms) {
                    this.organizeEnergyHarvesting(room);
                }
                this.setValue(this.MEMORY_LASTRUN, Game.time);
            }
        }
    }

    private organizeEnergyHarvesting(room: Room) {
        const sources = room.getSources();
        for (let source of sources) {
            this.orderHarvesters(room, source.id, room.name);
        }
    }

    private orderHarvesters(room: Room, sourceId: string, sourceRoom: string): void {
        const spawn = room.getSpawn();
        if (spawn === undefined) {
            return;
        }

        const sourceTarget = sourceRoom + '-' + sourceId;
        const active = this.creepService.getCreeps(Role.Harvester, sourceTarget, room.name).length;
        const ordered = OrdersRepository.getCreepsInQueue(room, Role.Harvester, sourceTarget);

        if (active + ordered === 0) {
            const order = new Order();
            const maxTier = ProfileUtilities.getMaxTierSimpleWorker(room.energyCapacityAvailable);
            order.body = ProfileUtilities.getSimpleWorkerBody(maxTier);
            if (room.name === sourceRoom) {
                order.priority = Priority.Important;
            } else {
                order.priority = Priority.Standard;
            }
            order.memory = {
                role: Role.Harvester,
                tier: maxTier,
                target: sourceTarget
            };
            OrdersRepository.orderCreep(room, order);
        }
    }
}
