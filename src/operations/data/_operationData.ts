import { OperationType } from 'enums/operationType';

export interface IOperationData {
  operationtype: OperationType;
  active: boolean;
  victoryCondition: number;
  victoryValue: number;
}
