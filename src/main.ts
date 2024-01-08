import 'prototypes/creep';
import 'prototypes/room';
import 'types';
import 'utils/commands';

import { LogLevel } from 'enums/logLevel';
import { Priority } from 'enums/priority';
import { BuildManager } from 'managers/build';
import { HarvestManager } from 'managers/harvest';
import { MemoryManager } from 'managers/memory';
import { OperationManager } from 'managers/operation';
import { SpawnManager } from 'managers/spawn';
import { TowerManager } from 'managers/tower';
import { UpgradeManager } from 'managers/upgrade';
import { CreepService } from 'services/creep';
import { RoomService } from 'services/room';
import { ErrorMapper, USE_ERROR_MAPPER } from 'utils/errorMapper';
import { alert, setLogLevel, warning } from 'utils/log';

/**
 * Display an alert when global resets.
 * @see https://wiki.screepspl.us/index.php/Global_reset
 */
alert('✨=== Global Reset ===✨');

/**
 * Wrap the main loop with the error mapper if enabled.
 */
const loopWrapper = USE_ERROR_MAPPER ? ErrorMapper.wrapLoop.bind(ErrorMapper) : (f: () => void) => f();

/**
 * The main loop is the entry point for the bot.
 * @see https://docs.screeps.com/game-loop.html
 */
export const loop = loopWrapper(() => {
  initSettings();

  const creepService = new CreepService();
  const roomService = new RoomService();
  const cpuLimit = getCpuLimit();

  const taskManagers = [
    new MemoryManager(),
    new TowerManager(roomService),
    new HarvestManager(roomService, creepService),
    new UpgradeManager(roomService, creepService),
    new BuildManager(roomService, creepService),
    new OperationManager(roomService, creepService)
  ];

  const priorityList = [Priority.Critical, Priority.Important, Priority.Standard, Priority.Low, Priority.Trivial];
  for (const priority of priorityList) {
    for (const manager of taskManagers) {
      if (priority === Priority.Critical || Game.cpu.getUsed() < cpuLimit) {
        manager.run(priority);
      }
    }
  }

  if (Game.cpu.bucket > 9500) {
    for (const manager of taskManagers) {
      if (Game.cpu.getUsed() < cpuLimit) {
        manager.run(Priority.Overflow);
      }
    }
  }

  new SpawnManager(roomService).run();
});

/**
 * Initialize bot settings in memory.
 */
function initSettings() {
  if (!Memory.settings) {
    warning('💎=== Script Loaded ===💎');
    Memory.settings = {};
  }
  if (!Memory.settings.loglevel) {
    setLogLevel(LogLevel.Verbose);
  }
  if (!Memory.settings.user) {
    Memory.settings.user = getUserNameOnSpawn();
  }
}

/**
 * Identify bot owner using `Game.spawns`.
 * @returns Owner of the first spawn structure.
 */
function getUserNameOnSpawn() {
  const spawns = Object.values(Game.spawns);
  return spawns[0]?.owner.username;
}

/**
 * Get the CPU limit based on CPU in bucket.
 * @returns CPU limit for this tick.
 */
function getCpuLimit() {
  const { bucket, limit } = Game.cpu;
  if (!limit) return 500; // Sim room

  const multipliers = [1.5, 1.3, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5];
  const thresholds = [9500, 9000, 8000, 5000, 4000, 3000, 2000, 1000];

  for (let i = 0; i < thresholds.length; i++) {
    if (bucket > thresholds[i]) {
      return limit * multipliers[i];
    }
  }

  return limit * 0.5;
}
