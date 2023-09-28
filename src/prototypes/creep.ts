// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Creep {
  getState(): number | undefined;
  setState(state: number): void;
  hasState(): boolean;
  getHomeroom(): string;
  isInHomeroom(): boolean;
  isEmpty(): boolean;
  _isEmpty?: boolean;
  isFull(): boolean;
  _isFull?: boolean;
}

Creep.prototype.hasState = function () {
  return this.memory.state !== undefined;
};

Creep.prototype.getState = function () {
  return this.memory.state;
};

Creep.prototype.setState = function (state: number) {
  this.memory.state = state;
};

Creep.prototype.getHomeroom = function () {
  return this.memory.homeroom;
};

Creep.prototype.isInHomeroom = function () {
  return this.memory.homeroom === this.room.name;
};

Creep.prototype.isEmpty = function () {
  if (this._isEmpty === undefined) {
    this._isEmpty = !this.store.getUsedCapacity();
  }
  return this._isEmpty;
};

Creep.prototype.isFull = function () {
  if (this._isFull === undefined) {
    this._isFull = !this.store.getFreeCapacity();
  }
  return this._isFull;
};
