import { OperationType } from 'enums/operationType';
import { IOperationData } from 'operations/data/_operationData';

export enum VictoryCondition {
  Gametime = 1
}

export class Data implements IOperationData {
  operationtype: OperationType = OperationType.Test;
  active = true;
  victoryCondition: VictoryCondition;
  victoryValue: number;
}
