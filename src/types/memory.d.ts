type Role = import('enums/role').Role;
type LogLevel = import('enums/logLevel').LogLevel;
type RoomType = import('enums/roomType').RoomType;
type SpawnOrder = import('classes/order').Order;
type IOperationData = import('operations/data/_operationData').IOperationData;

interface Memory {
  creeps: Record<string, CreepMemory>;
  flags: Record<string, any>;
  manager: Record<string, ManagerData>;
  operations: IOperationData[];
  powerCreeps: Record<string, any>;
  rooms: Record<string, RoomMemory>;
  settings: Partial<SettingsData>;
  spawns: Record<string, any>;
}

interface CreepMemory {
  role: Role;
  tier: number;
  state?: number;
  homeroom?: string;
  target?: string;
  source?: Id<Source>;
}

interface RoomMemory {
  orders?: SpawnOrder[];
  t?: RoomType;
}

interface SettingsData {
  user: string;
  loglevel: LogLevel;
}

type ManagerData = Record<string, number>;
