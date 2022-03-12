import * as OperationTest from "../operations/Test";
import { CreepService } from "../services/Creep";
import { RoomService } from "../services/Room";
import { OperationType } from "../enums/operationtype";
import { IOperationData } from "../operations/_OperationData";
import { log } from "../tools/Logger";
import { Manager, ManagerPriority } from "./_Manager";

export class OperationManager extends Manager {
    private roomService: RoomService;
    private creepService: CreepService;

    readonly MEMORY_MAINTAIN = "maintain";

    constructor(roomService: RoomService, creepService: CreepService) {
        super("OperationManager");
        this.roomService = roomService;
        this.creepService = creepService;
    }

    public run(pri: ManagerPriority) {
        if (pri === ManagerPriority.Trivial) {
            const lastRunMaintain = this.getValue(this.MEMORY_MAINTAIN);
            if (lastRunMaintain === undefined || lastRunMaintain + 1000 < Game.time) {
                this.deleteOldOperations();
                this.setValue(this.MEMORY_MAINTAIN, Game.time);
            }
        }

        if (Memory.operations === undefined) {
            Memory.operations = [];
        }

        for (const operation of Memory.operations as IOperationData[]) {
            switch (operation.operationtype) {
                // This is the Test Operation example
                case OperationType.Test:
                    if (operation.active && !OperationTest.victoryConditionReached(operation as OperationTest.Data)) {
                        OperationTest.run(operation as OperationTest.Data, pri);
                    } else {
                        operation.active = false;
                    }
                    break;
                // Add additional Operations here
                // You can pass roomService and/or creepService to use in your operation
            }
        }
    }

    private deleteOldOperations() {
        if (Memory.operations === undefined) {
            Memory.operations = [];
        }
        const removed = _.remove(Memory.operations, (o: IOperationData) => o.active === false);
        if (removed.length) {
            log.error(`Removed ${removed.length} inactive operations.`);
        }
    }
}
