import { Role } from "../enums/role";
import { log } from "../tools/Logger";

export class CreepService {
    private creepDictionary: { [role: number]: Creep[] };

    constructor() {
        this.creepDictionary = this.makeDictionary();
    }

    public creepShouldRun(creep: Creep): boolean {
        if (creep.memory.homeroom === undefined) {
            creep.memory.homeroom = creep.room.name;
        }

        if (creep.spawning) {
            return false;
        }
        return true;
    }

    public runCreeps(role: Role, roleRunMethod: Function) {
        const creepsWithRole = this.getAllOfRole(role);
        for (const creep of creepsWithRole) {
            if (this.creepShouldRun(creep)) {
                roleRunMethod(creep);
            }
        }
    }

    public getCreeps(role: Role | null = null, target: string | null = null, homeroom: string | null = null) {
        const creeps: Creep[] = [];

        if (role !== null) {
            if (this.creepDictionary[role] === undefined) {
                return creeps;
            }
            for (const creep of this.creepDictionary[role]) {
                if (
                    (target === null || creep.memory.target === target) &&
                    (homeroom === null || creep.memory.homeroom === homeroom) &&
                    (creep.memory.squad === undefined || creep.memory.squad === null)
                ) {
                    creeps.push(creep);
                }
            }
            return creeps;
        }

        for (const creepName in Game.creeps) {
            const creep = Game.creeps[creepName];
            if (
                (target === null || creep.memory.target === target) &&
                (homeroom === null || creep.memory.homeroom === homeroom) &&
                (role === null || creep.memory.role === role) &&
                (creep.memory.squad === undefined || creep.memory.squad === null)
            ) {
                creeps.push(creep);
            }
        }
        return creeps;
    }

    public getAllOfRole(role: Role) {
        if (this.creepDictionary[role] !== undefined) {
            return this.creepDictionary[role];
        }
        return [];
    }

    private makeDictionary() {
        const creeps: { [role: number]: Creep[] } = {};

        for (const name in Game.creeps) {
            const creep = Game.creeps[name];

            if (creep.memory.role === undefined) {
                log.warning(`Creep ${creep.name} role is undefined`, creep.room.name);
                continue;
            }

            if (creeps[creep.memory.role] === undefined) {
                creeps[creep.memory.role] = [];
            }
            creeps[creep.memory.role].push(creep);
        }
        return creeps;
    }
}
