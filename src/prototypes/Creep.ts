export {};

declare global {
  interface Creep {
    isFull: boolean;
    hadState(state: number): boolean;
    hasState(state?: number): boolean;
    setState(state: number): void;

    // private
    _states?: number[];
  }
}

Object.defineProperty(Creep.prototype, 'isFull', {
  get(this: Creep) {
    return !this.store.getFreeCapacity();
  }
});

Creep.prototype.hadState = function (state) {
  if (!this._states) {
    this._states = [];
  }
  return this._states.includes(state);
};

Creep.prototype.hasState = function (state) {
  return this.memory.state !== state;
};

Creep.prototype.setState = function (state) {
  if (!this._states) {
    this._states = [];
  }
  this._states.push(state);
  this.memory.state = state;
};
