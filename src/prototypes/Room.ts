// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Room {
  _mySpawn?: StructureSpawn;
  getMySpawn(): StructureSpawn | undefined;
}

Room.prototype.getMySpawn = function () {
  if (!this._mySpawn) {
    this._mySpawn = this.find(FIND_MY_SPAWNS)?.[0];
  }
  return this._mySpawn;
};
