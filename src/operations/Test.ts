/**
 * Operation: Test
 *
 * Operations can be used to created automated "missions"
 * Follow this example to create something more useful
 *
 * Victory conditions:
 * - Gametime reaches set duration
 */

import { ManagerPriority } from "../managers/_Manager";

import { OperationType } from "../enums/operationtype";
import { IOperationData } from "./_OperationData";

import { log } from "../tools/Logger";

export enum VictoryCondition {
    Gametime = 1
}

export class Data implements IOperationData {
    operationtype: OperationType = OperationType.Test;
    active = true;
    victoryCondition: VictoryCondition;
    victoryValue: any;
    // You can add additional Operation Data props here
}

export function run(operation: Data, pri: ManagerPriority): void {
    if (pri === ManagerPriority.Low) {
        if (Game.time % 10 === 0) {
            testMethod(operation);
        }
    }
}

export function victoryConditionReached(operation: Data): boolean {
    if (operation.victoryCondition === VictoryCondition.Gametime) {
        if (Game.time > operation.victoryValue) {
            log.info("Test Operation finished at tick " + Game.time);
            operation.active = false;
            return true;
        }
    }
    return false;
}

function testMethod(operation: Data): void {
    if (Game.time > operation.victoryValue) {
        return;
    }
    log.info("Test Operation is active at tick " + Game.time);
}
