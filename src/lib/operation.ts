import * as OperationTest from "../operations/Test";
import { IOperationData } from "../operations/_OperationData";
import { OperationType } from "../enums/operationtype";
import { log } from "../tools/Logger";

function addOperation(operation: IOperationData) {
    if (Memory.operations === undefined) {
        Memory.operations = [];
    }
    Memory.operations.push(operation);
}

export function roomHasActiveTestOperation() {
    if (Memory.operations === undefined) {
        Memory.operations = [];
    }

    if (Memory.operations.length === 0) {
        return false;
    }
    for (const o of Memory.operations as IOperationData[]) {
        if (o.active && o.operationtype === OperationType.Test) {
            return true;
        }
    }
    return false;
}

export function createTestOperation() {
    const op: OperationTest.Data = new OperationTest.Data();
    op.operationtype = OperationType.Test;
    op.victoryCondition = OperationTest.VictoryCondition.Gametime;
    op.victoryValue = Game.time + 50;
    addOperation(op);
    log.info("Starting hello world Test operation for 50 ticks");
    return true;
}
