import { OperationType } from 'enums/operationType';

export enum VictoryCondition {
  GameTime = 1
}

export class Data implements OperationData {
  type: OperationType = OperationType.Test;
  active = true;
  victoryCondition: VictoryCondition;
  victoryValue: number;
}
