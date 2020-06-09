import {Role} from "../enums/role";
import {Priority} from "../enums/priority";

export class Order {
    public priority: Priority;
    public body: BodyPartConstant[];
    public memory: {
        role: Role,
        tier: number,
        target?: string,
        homeroom?: string,
    };
}
