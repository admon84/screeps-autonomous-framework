export {};

declare global {
  interface Room {
    getMySpawn(): StructureSpawn | undefined;

    /** @hidden */
    _mySpawn?: StructureSpawn;
  }
}

Room.prototype.getMySpawn = function () {
  if (!this._mySpawn) {
    this._mySpawn = this.find(FIND_MY_SPAWNS)?.[0];
  }
  return this._mySpawn;
};
