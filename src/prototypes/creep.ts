export {};

declare global {
  interface Creep {
    /** Checks if a creep is carrying the max amount of resources. */
    isFull: boolean;
    /** Checks if a creep had a specific state (task) this tick. */
    hadState(state: number): boolean;
    /** Checks if a creep currently has a specific state (task). */
    hasState(state?: number): boolean;
    /** Changes the current state (task) for a creep. */
    setState(state: number): void;
    /** Changes the current state (task) for a creep and executes the runFunction. */
    setStateAndRun(state: number, runFunction: (...args: any[]) => void, ...args: any[]): void;

    /** @private */
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
  if (state === undefined) {
    return this.memory.state !== state;
  }
  return this.memory.state === state;
};

Creep.prototype.setState = function (state) {
  if (!this._states) {
    this._states = [];
  }
  this._states.push(state);
  this.memory.state = state;
};

Creep.prototype.setStateAndRun = function (state, runFunction, ...args) {
  const canRunFunction = !this.hadState(state);
  this.setState(state);
  if (canRunFunction) {
    runFunction(this, args);
  }
};
