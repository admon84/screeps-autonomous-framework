import { OperationType } from 'enums/operationtype';
import { IOperationData } from 'operations/data/_OperationData';

export enum VictoryCondition {
  Gametime = 1
}

export class Data implements IOperationData {
  operationtype: OperationType = OperationType.Test;
  active = true;
  victoryCondition: VictoryCondition;
  victoryValue: number;
}
