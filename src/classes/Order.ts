import { Priority } from 'enums/priority';
import { Role } from 'enums/role';

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
