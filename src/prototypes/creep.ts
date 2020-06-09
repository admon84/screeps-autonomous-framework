/**
 * Creep prototypes
 */

Creep.prototype.hasState = function(): boolean {
    return this.memory.state !== undefined;
};

Creep.prototype.getState = function(): number {
    return this.memory.state;
};

Creep.prototype.setState = function(state: number): void {
    this.memory.state = state;
};

Creep.prototype.getHomeroom = function (): string {
    return this.memory.homeroom;
};

Creep.prototype.isInHomeroom = function (): boolean {
    return this.memory.homeroom === this.room.name;
};

Creep.prototype.isEnergyEmpty = function(): boolean {
    if (this._energyEmpty === undefined) {
        this._energyEmpty = this.store[RESOURCE_ENERGY] === 0;
    }
    return this._energyEmpty;
};

Creep.prototype.isEmpty = function(): boolean {
    if (this._empty === undefined) {
        this._empty = this.store.getUsedCapacity() === 0;
    }
    return this._empty;
};

Creep.prototype.isCarrying = function(): boolean {
    if (this._carrying === undefined) {
        this._carrying = !this.isEmpty();
    }
    return this._carrying;
};

Creep.prototype.isFull = function(): boolean {
    if (this._full === undefined) {
        this._full = this.store.getFreeCapacity() === 0;
    }
    return this._full;
};