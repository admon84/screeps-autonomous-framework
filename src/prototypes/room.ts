export {};

declare global {
  interface Room {
    /** Finds the first owned spawn in a room if available. */
    getMySpawn(): StructureSpawn | undefined;

    /** @private */
    _mySpawn?: StructureSpawn;
  }
}

Room.prototype.getMySpawn = function () {
  if (!this._mySpawn) {
    this._mySpawn = this.find(FIND_MY_SPAWNS)?.[0];
  }
  return this._mySpawn;
};
