import "../prototypes/creep";
import "../prototypes/room";
import "../prototypes/roomposition";
// Import additional prototypes here!

import {Manager, ManagerPriority} from "../managers/_Manager";

import {MemoryManager} from "../managers/Memory";
import {OperationManager} from "../managers/Operation";
import {TowerManager} from "../managers/Tower";
import {SpawnManager} from "../managers/Spawn";
import {HarvestManager} from "../managers/Harvest";
import {BuildManager} from "../managers/Build";
import {UpgradeManager} from "../managers/Upgrade";

import {CreepService} from "../services/Creep";
import {RoomService} from "../services/Room";

export function run() {

    if (Memory.settings === undefined) {
        Memory.settings = {};
        console.log('Bot Loaded.');
    }
    if (Memory.settings.loggingLevel === undefined) {
        Memory.settings.loggingLevel = 6;
        console.log('Verbose Logging Enabled.');
    }
    if (Memory.settings.user === undefined) {
        Memory.settings.user = getUserName();
    }

    const creepService = new CreepService();
    const roomService = new RoomService();

    const cpuLimit = getCpuLimit();
    const managerList: Manager[] = [
        new MemoryManager(),
        new TowerManager(roomService, creepService),
        new HarvestManager(roomService, creepService),
        new UpgradeManager(roomService, creepService),
        new BuildManager(roomService, creepService),
        new OperationManager(roomService, creepService),
        // Create other managers and add them here!
    ];
    const spawnManager = new SpawnManager(roomService);

    for (let manager of managerList) {
        runManager(manager, ManagerPriority.Critical, ManagerPriority.Critical);
    }
    
    for (let manager of managerList) {
        if (Game.cpu.getUsed() < cpuLimit) {
            runManager(manager, ManagerPriority.Standard, ManagerPriority.Standard);
        }
    }

    for (let manager of managerList) {
        if (Game.cpu.getUsed() < cpuLimit) {
            runManager(manager, ManagerPriority.Low, ManagerPriority.Low);
        }
    }

    for (let manager of managerList) {
        if (Game.cpu.getUsed() < cpuLimit) {
            runManager(manager, ManagerPriority.Trivial, ManagerPriority.Trivial);
        }
    }

    if (Game.cpu.bucket > 9500) {
        for (let manager of managerList) {
            if (Game.cpu.getUsed() < cpuLimit) {
                runManager(manager, ManagerPriority.Overflow, ManagerPriority.Overflow);
            }
        }
    }

    runManager(spawnManager, ManagerPriority.Critical);
}

function getCpuLimit(): number {
    if (Game.cpu.limit === undefined) {
        // Possibly simulation
        return 10000;
    }
    if (Game.cpu.bucket > 9900) {
        return Game.cpu.limit * 1.6;
    }
    if (Game.cpu.bucket > 9600) {
        return Game.cpu.limit * 1.3;
    }
    if (Game.cpu.bucket > 9200) {
        return Game.cpu.limit * 1.1;
    }
    if (Game.cpu.bucket > 8600) {
        return Game.cpu.limit * 0.9;
    }
    if (Game.cpu.bucket > 8000) {
        return Game.cpu.limit * 0.8;
    }
    if (Game.cpu.bucket > 7000) {
        return Game.cpu.limit * 0.7;
    }
    return Game.cpu.limit * 0.5;
}

function runManager(component: Manager | Function, pri: ManagerPriority, ... args: any[]) {
    if (component instanceof Manager) {
        component.run(pri);
    } else {
        component(... args);
    }
}

function getUserName(): string | undefined {
    const spawnNames = Object.keys(Game.spawns);
    if (spawnNames.length === 0) {
        return;
    }
    return Game.spawns[spawnNames[0]].owner.username;
}
