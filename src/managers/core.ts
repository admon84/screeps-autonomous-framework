import 'prototypes/creep';
import 'prototypes/room';

import { LogLevel } from 'enums/logLevel';
import { Priority } from 'enums/priority';
import { Manager } from 'managers/_manager';
import { BuildManager } from 'managers/build';
import { HarvestManager } from 'managers/harvest';
import { MemoryManager } from 'managers/memory';
import { OperationManager } from 'managers/operation';
import { SpawnManager } from 'managers/spawn';
import { TowerManager } from 'managers/tower';
import { UpgradeManager } from 'managers/upgrade';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
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
