import * as ProfileUtilities from "../utilities/Profiles";

import {Order} from "../classes/Order";

import * as OrdersRepository from "../repository/Orders";

import {Role} from "../enums/role";
import {Priority} from "../enums/priority";

import {Manager, ManagerPriority} from "./_Manager";

import {CreepService} from "../services/Creep";
import {RoomService} from "../services/Room";

export class TowerManager extends Manager {

    private roomService: RoomService;
    private creepService: CreepService;

    readonly MEMORY_LASTRUN = "lastRun";

    constructor(roomService: RoomService, creepService: CreepService) {
        super("TowerManager");
        this.roomService = roomService;
        this.creepService = creepService;
    }

    public run (pri: ManagerPriority): void {
        if (pri === ManagerPriority.Critical) {
            let normalRooms = this.roomService.getNormalRooms();
            for (let room of normalRooms) {
                this.controlTowers(room);
            }
        }
    }

    private controlTowers(room: Room) {
        const towersWithEnergy = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                    structure.store[RESOURCE_ENERGY] > 0);
            }
        }) as StructureTower[];

        for (let tower of towersWithEnergy) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
}
