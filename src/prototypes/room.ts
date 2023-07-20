/**
 * Room prototypes
 */

Room.prototype.getMySpawns = function () {
  if (this._mySpawns === undefined) {
    this._mySpawns = this.find(FIND_MY_SPAWNS);
  }
  return this._mySpawns;
};

Room.prototype.getSpawn = function () {
  if (!this._firstSpawn) {
    this._firstSpawn = this.getMySpawns()?.[0];
  }
  return this._firstSpawn;
};

Room.prototype.getSources = function () {
  if (!this._sources) {
    this._sources = this.find(FIND_SOURCES);
  }
  return this._sources;
};

Room.prototype.getMineral = function () {
  if (this._mineral === undefined) {
    this._mineral = this.find(FIND_MINERALS)?.[0];
  }
  return this._mineral;
};
