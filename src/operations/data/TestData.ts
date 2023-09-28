import { IOperationData } from './_OperationData';
import { OperationType } from '../../enums/operationtype';

export enum VictoryCondition {
  Gametime = 1
}

export class Data implements IOperationData {
  operationtype: OperationType = OperationType.Test;
  active = true;
  victoryCondition: VictoryCondition;
  victoryValue: number;
}
