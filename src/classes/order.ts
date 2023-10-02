import { Priority } from 'enums/priority';
import { Role } from 'enums/role';

/**
 * The `Orders` class is used to spawn creeps from a priority-based queue.
 */

export class Order {
  public priority: Priority;
  public body: BodyPartConstant[];
  public memory: {
    role: Role;
    tier: number;
    target?: string;
    homeroom?: string;
  };
}
