/**
 * Room prototypes
 */

Room.prototype.getSpawn = function () {
  if (!this._firstSpawn) {
    this._firstSpawn = this.find(FIND_MY_SPAWNS)?.[0];
  }
  return this._firstSpawn;
};

Room.prototype.getMineral = function () {
  if (this._mineral === undefined) {
    this._mineral = this.find(FIND_MINERALS)?.[0];
  }
  return this._mineral;
};
