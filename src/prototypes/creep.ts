/**
 * Creep prototypes
 */

Creep.prototype.hasState = function (): boolean {
    return this.memory.state !== undefined;
};

Creep.prototype.getState = function (): number {
    return this.memory.state;
};

Creep.prototype.setState = function (state: number): void {
    this.memory.state = state;
};

Creep.prototype.getHomeroom = function (): string {
    return this.memory.homeroom;
};

Creep.prototype.isInHomeroom = function (): boolean {
    return this.memory.homeroom === this.room.name;
};

Creep.prototype.hasEnergy = function (): boolean {
    if (this._hasEnergy === undefined) {
        this._hasEnergy = this.store[RESOURCE_ENERGY] !== 0;
    }
    return this._hasEnergy;
};

Creep.prototype.isEmpty = function (): boolean {
    if (this._isEmpty === undefined) {
        this._isEmpty = this.store.getUsedCapacity() === 0;
    }
    return this._isEmpty;
};

Creep.prototype.isFull = function (): boolean {
    if (this._isFull === undefined) {
        this._isFull = this.store.getFreeCapacity() === 0;
    }
    return this._isFull;
};
