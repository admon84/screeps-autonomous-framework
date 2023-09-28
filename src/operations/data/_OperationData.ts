import { OperationType } from '../../enums/operationtype';

export interface IOperationData {
  operationtype: OperationType;
  active: boolean;
  victoryCondition: number;
  victoryValue: number;
}
