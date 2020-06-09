/**
 *  Checks all creeps references in memory and deletes any dead creeps
 */

import {Manager, ManagerPriority} from "../managers/_Manager";

export class MemoryManager extends Manager {

    readonly MEMORY_LASTRUN = "lastRun";

    constructor() {
        super("MemoryManager");
    }

    public run (pri: ManagerPriority): void {
        if (pri === ManagerPriority.Low) {
            const lastRun = this.getValue(this.MEMORY_LASTRUN);
            if (lastRun === undefined || lastRun + 20 < Game.time) {
                this.deleteCreepsFromMemory();
                this.setValue(this.MEMORY_LASTRUN, Game.time);
            }
        }
    }

    private deleteCreepsFromMemory(): void {
        for (let i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
}
