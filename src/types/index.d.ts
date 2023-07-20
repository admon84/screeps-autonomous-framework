type Role = import('../enums/role').Role;
type LogLevel = import('../enums/loglevel').LogLevel;
type RoomType = import('../enums/roomtype').Roomtype;
type SpawnOrder = import('../classes/Order').Order;
type IOperationData = import('../operations/data/_OperationData').IOperationData;

interface CreepMemory {
  role: Role;
  tier: number;
  homeroom?: string;
  target?: string;
  source?: Id<Source>;
}

interface RoomMemory {
  orders?: SpawnOrder[];
  t?: RoomType;
}

interface PowerCreepMemory {
  [name: string]: any;
}

interface FlagMemory {
  [name: string]: any;
}

interface SpawnMemory {
  [name: string]: any;
}

type ManagerData = {
  [name: string]: number;
};

interface Memory {
  manager: {
    [name: string]: ManagerData;
  };

  operations: IOperationData[];

  settings: Partial<{
    user: string;
    loglevel: LogLevel;
  }>;
}
