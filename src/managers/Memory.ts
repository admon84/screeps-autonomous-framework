/**
 *  Checks all creeps references in memory and deletes any dead creeps
 */

import { Manager, ManagerPriority } from './_Manager';

export class MemoryManager extends Manager {
  readonly MEMORY_LASTRUN = 'lastRun';

  constructor() {
    super('MemoryManager');
  }

  public run(pri: ManagerPriority) {
    if (pri === ManagerPriority.Low) {
      const lastRun = this.getValue(this.MEMORY_LASTRUN);
      if (!lastRun || lastRun + 20 < Game.time) {
        this.deleteCreepsFromMemory();
        this.setValue(this.MEMORY_LASTRUN, Game.time);
      }
    }
  }

  private deleteCreepsFromMemory() {
    for (const i in Memory.creeps) {
      if (!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  }
}
