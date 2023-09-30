/**
 *  Checks all creeps references in memory and deletes any dead creeps
 */

import { Priority } from 'enums/priority';
import { Manager } from 'managers/manager';

export class MemoryManager extends Manager {
  readonly MEMORY_LASTRUN = 'lastRun';

  constructor() {
    super('MemoryManager');
  }

  public run(pri: Priority) {
    if (pri === Priority.Low) {
      const lastRun = this.getValue(this.MEMORY_LASTRUN);
      if (!lastRun || lastRun + 20 < Game.time) {
        this.deleteCreepsFromMemory();
        this.setValue(this.MEMORY_LASTRUN, Game.time);
      }
    }
  }

  private deleteCreepsFromMemory() {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      }
    }
  }
}
