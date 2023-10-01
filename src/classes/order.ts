import { Priority } from 'enums/priority';
import { Role } from 'enums/role';

/**
 * Orders are used to spawn creeps with a priority level, body parts, and memory.
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
