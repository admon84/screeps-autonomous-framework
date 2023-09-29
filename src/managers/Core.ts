import 'prototypes/Creep';
import 'prototypes/Room';

import { LogLevel } from 'enums/loglevel';
import { Priority } from 'enums/priority';
import { BuildManager } from 'managers/Build';
import { HarvestManager } from 'managers/Harvest';
import { MemoryManager } from 'managers/Memory';
import { OperationManager } from 'managers/Operation';
import { SpawnManager } from 'managers/Spawn';
import { TowerManager } from 'managers/Tower';
import { UpgradeManager } from 'managers/Upgrade';
import { Manager } from 'managers/_Manager';
import { CreepService } from 'services/Creep';
import { RoomService } from 'services/Room';
import { setLogLevel, warning } from 'utils/log';

export function run() {
  if (!Memory.settings) {
    warning('💎=== Script Loaded ===💎');
    Memory.settings = {};
  }
  if (!Memory.settings.loglevel) {
    setLogLevel(LogLevel.Verbose);
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
  ];

  const priorityList = [Priority.Critical, Priority.Important, Priority.Standard, Priority.Low, Priority.Trivial];
  for (const priority of priorityList) {
    for (const manager of managerList) {
      if (priority === Priority.Critical || Game.cpu.getUsed() < cpuLimit) {
        manager.run(priority);
      }
    }
  }

  if (Game.cpu.bucket > 9500) {
    for (const manager of managerList) {
      if (Game.cpu.getUsed() < cpuLimit) {
        manager.run(Priority.Overflow);
      }
    }
  }

  new SpawnManager(roomService).run();
}

function getUserName() {
  const spawns = Object.values(Game.spawns);
  return spawns[0]?.owner.username;
}

function getCpuLimit() {
  const { bucket, limit } = Game.cpu;
  if (!limit) return 500; // Sim mode
  if (bucket > 9500) return limit * 1.6;
  if (bucket > 9000) return limit * 1.3;
  if (bucket > 8000) return limit * 1.1;
  if (bucket > 5000) return limit;
  if (bucket > 4000) return limit * 0.9;
  if (bucket > 3000) return limit * 0.8;
  if (bucket > 2000) return limit * 0.7;
  if (bucket > 1000) return limit * 0.6;
  return limit * 0.5;
}
