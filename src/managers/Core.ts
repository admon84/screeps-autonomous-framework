import "../prototypes/creep";
import "../prototypes/room";
import "../prototypes/roomposition";
import { MemoryManager } from "./Memory";
import { OperationManager } from "./Operation";
import { TowerManager } from "./Tower";
import { SpawnManager } from "./Spawn";
import { HarvestManager } from "./Harvest";
import { BuildManager } from "./Build";
import { UpgradeManager } from "./Upgrade";
import { CreepService } from "../services/Creep";
import { RoomService } from "../services/Room";
import { LogLevel } from "../enums/loglevel";
import { log } from "../tools/Logger";
import { Manager, ManagerPriority } from "./_Manager";

export function run() {
    if (Memory.settings === undefined) {
        Memory.settings = {};
        log.warning("==== Script Loaded ====");
    }
    if (Memory.settings.loggingLevel === undefined) {
        Memory.settings.loggingLevel = LogLevel.Verbose;
        log.debug("Verbose logging enabled.");
    }
    if (Memory.settings.user === undefined) {
        Memory.settings.user = getUserName();
    }

    const creepService = new CreepService();
    const roomService = new RoomService();

    const cpuLimit = getCpuLimit();
    const managerList: Manager[] = [
        new MemoryManager(),
        new TowerManager(roomService),
        new HarvestManager(roomService, creepService),
        new UpgradeManager(roomService, creepService),
        new BuildManager(roomService, creepService),
        new OperationManager(roomService, creepService)
        // Create other managers and add them here
    ];
    const spawnManager = new SpawnManager(roomService);

    for (const manager of managerList) {
        runManager(manager, ManagerPriority.Critical, ManagerPriority.Critical);
    }

    for (const manager of managerList) {
        if (Game.cpu.getUsed() < cpuLimit) {
            runManager(manager, ManagerPriority.Standard, ManagerPriority.Standard);
        }
    }

    for (const manager of managerList) {
        if (Game.cpu.getUsed() < cpuLimit) {
            runManager(manager, ManagerPriority.Low, ManagerPriority.Low);
        }
    }

    for (const manager of managerList) {
        if (Game.cpu.getUsed() < cpuLimit) {
            runManager(manager, ManagerPriority.Trivial, ManagerPriority.Trivial);
        }
    }

    if (Game.cpu.bucket > 9500) {
        for (const manager of managerList) {
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
    if (Game.cpu.bucket > 9500) {
        return Game.cpu.limit * 1.3;
    }
    if (Game.cpu.bucket > 9000) {
        return Game.cpu.limit * 1.1;
    }
    if (Game.cpu.bucket > 5000) {
        return Game.cpu.limit;
    }
    if (Game.cpu.bucket > 4000) {
        return Game.cpu.limit * 0.9;
    }
    if (Game.cpu.bucket > 3000) {
        return Game.cpu.limit * 0.8;
    }
    if (Game.cpu.bucket > 2000) {
        return Game.cpu.limit * 0.7;
    }
    if (Game.cpu.bucket > 1000) {
        return Game.cpu.limit * 0.6;
    }
    return Game.cpu.limit * 0.5;
}

function runManager(component: Manager | Function, pri: ManagerPriority, ...args: any[]) {
    if (component instanceof Manager) {
        component.run(pri);
    } else {
        component(...args);
    }
}

function getUserName(): string | undefined {
    const spawnNames = Object.keys(Game.spawns);
    if (spawnNames.length === 0) {
        return;
    }
    return Game.spawns[spawnNames[0]].owner.username;
}
