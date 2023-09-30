import { Order } from 'classes/order';
import { LogLevel } from 'enums/logLevel';
import { OperationType } from 'enums/operationType';
import { Role } from 'enums/role';
import { RoomType } from 'enums/roomType';
import _ from 'lodash';

declare global {
  const _: typeof _;

  interface Memory {
    creeps: Record<string, CreepMemory>;
    flags: Record<string, FlagMemory>;
    manager: Record<string, ManagerData>;
    operations: OperationData[];
    powerCreeps: Record<string, PowerCreepMemory>;
    rooms: Record<string, RoomMemory>;
    settings: Partial<SettingsData>;
    spawns: Record<string, SpawnMemory>;
  }

  interface CreepMemory {
    role: Role;
    tier: number;
    state?: number;
    homeroom?: string;
    target?: string;
    source?: Id<Source>;
  }

  interface OperationData {
    type: OperationType;
    active: boolean;
    victoryCondition: number;
    victoryValue: number;
  }

  interface RoomMemory {
    orders?: Order[];
    t?: RoomType;
  }

  interface SettingsData {
    user: string;
    loglevel: LogLevel;
  }

  type ManagerData = Record<string, number>;
}
