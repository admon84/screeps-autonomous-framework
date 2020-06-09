export enum ManagerPriority {
    Critical = 1,
    Standard = 2,
    Low = 3,
    Trivial = 4,
    Overflow = 5,
    None = 6
}

export abstract class Manager {
    
    constructor(name: string) {
        this.name = name;
        this.memoryCheck();
    }

    private name: string;

    protected memoryCheck() {
        if (Memory.manager === undefined) {
            Memory.manager = {};
        }
        if (Memory.manager[this.name] === undefined) {
            Memory.manager[this.name] = {};
        }
    }

    public abstract run(pri: ManagerPriority): void;

    protected getValue(name: string): any {
        return Memory.manager[this.name][name];
    }

    protected setValue(name: string, value: any): void {
        Memory.manager[this.name][name] = value;
    }
}
