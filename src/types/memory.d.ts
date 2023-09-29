type Role = import('enums/role').Role;
type LogLevel = import('enums/loglevel').LogLevel;
type RoomType = import('enums/roomtype').Roomtype;
type SpawnOrder = import('classes/Order').Order;
type IOperationData = import('operations/data/_OperationData').IOperationData;

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
