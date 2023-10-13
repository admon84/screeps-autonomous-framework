// eslint-disable-next-line import/no-unresolved
import _ from 'lodash';

import { Order } from 'classes/order';
import { LogLevel } from 'enums/logLevel';
import { OperationType } from 'enums/operationType';
import { Role } from 'enums/role';
import { RoomType } from 'enums/roomType';

declare global {
  /**
   * Imported Lodash types.
   * @hidden
   */
  const _: typeof _;

  /**
   * Global `Memory` object.
   * @see https://docs.screeps.com/global-objects.html#Memory-object
   */
  interface Memory {
    creeps: Record<string, CreepMemory>;
    flags: Record<string, FlagMemory>;
    managers: Record<string, ManagerMemory>;
    operations: OperationData[];
    powerCreeps: Record<string, PowerCreepMemory>;
    rooms: Record<string, RoomMemory>;
    settings: Partial<SettingsMemory>;
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

  interface SettingsMemory {
    user: string;
    loglevel: LogLevel;
  }

  type ManagerMemory = Record<string, number>;
}
