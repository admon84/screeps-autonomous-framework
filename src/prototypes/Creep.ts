interface Creep {
  _states?: number[];
  isFull: boolean;
  hadState(state: number): boolean;
  hasState(state?: number): boolean;
  setState(state: number): void;
}

Object.defineProperty(Creep.prototype, 'isFull', {
  get(this: Creep) {
    return !this.store.getFreeCapacity();
  }
});

Creep.prototype.hadState = function (this: Creep, state: number) {
  if (!this._states) {
    this._states = [];
  }
  return this._states.includes(state);
};

Creep.prototype.hasState = function (this: Creep, state?: number) {
  return this.memory.state !== state;
};

Creep.prototype.setState = function (this: Creep, state: number) {
  if (!this._states) {
    this._states = [];
  }
  this._states.push(state);
  this.memory.state = state;
};
