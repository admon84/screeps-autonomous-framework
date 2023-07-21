import '../prototypes/creep';
import '../prototypes/room';
import { MemoryManager } from './Memory';
import { Manager } from './_Manager';
import { OperationManager } from './Operation';
import { TowerManager } from './Tower';
import { SpawnManager } from './Spawn';
import { HarvestManager } from './Harvest';
import { BuildManager } from './Build';
import { UpgradeManager } from './Upgrade';
import { CreepService } from '../services/Creep';
import { RoomService } from '../services/Room';
import { Priority } from '../enums/priority';
import { LogLevel } from '../enums/loglevel';
import { log } from '../utils/logger';

export function run() {
  if (!Memory.settings) {
    log.warning('💎=== Script Loaded ===💎');
    Memory.settings = {};
  }
  if (!Memory.settings.loglevel) {
    Memory.settings.loglevel = LogLevel.Verbose;
  }
  if (!Memory.settings.user) {
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
    // Add other managers to control high-level behaviors
  ];

  const priorities = [Priority.Critical, Priority.Important, Priority.Standard, Priority.Low, Priority.Trivial];
  for (const pri of priorities) {
    for (const manager of managerList) {
      if (pri === Priority.Critical || Game.cpu.getUsed() < cpuLimit) {
        runManager(manager, pri, pri);
      }
    }
  }

  if (Game.cpu.bucket > 9500) {
    for (const manager of managerList) {
      if (Game.cpu.getUsed() < cpuLimit) {
        runManager(manager, Priority.Overflow, Priority.Overflow);
      }
    }
  }

  runManager(new SpawnManager(roomService), Priority.Critical);
}

function runManager(component: Manager | Function, pri: Priority, ...args: any[]) {
  if (component instanceof Manager) {
    component.run(pri);
  } else {
    component(...args);
  }
}

function getUserName() {
  const spawns = Object.values(Game.spawns);
  return spawns[0]?.owner.username;
}

function getCpuLimit() {
  const { bucket, limit } = Game.cpu;
  if (!limit) return 10000; // Sim mode
  if (bucket > 9900) return limit * 1.6;
  if (bucket > 9500) return limit * 1.3;
  if (bucket > 9000) return limit * 1.1;
  if (bucket > 5000) return limit;
  if (bucket > 4000) return limit * 0.9;
  if (bucket > 3000) return limit * 0.8;
  if (bucket > 2000) return limit * 0.7;
  if (bucket > 1000) return limit * 0.6;
  return limit * 0.5;
}
