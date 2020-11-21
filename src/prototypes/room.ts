/**
 * Room prototypes
 */

Room.prototype.getMySpawns = function (): StructureSpawn[] {
    if (this._mySpawns === undefined) {
        this._mySpawns = this.find(FIND_MY_SPAWNS) as StructureSpawn[];
    }
    return this._mySpawns;
};

Room.prototype.getSpawn = function (): StructureSpawn | undefined {
    const spawns = this.getMySpawns();
    if (spawns === undefined || spawns.length < 1) {
        return undefined;
    }
    return spawns[0];
};

Room.prototype.getSources = function (): Source[] {
    if (!this._sources) {
        this._sources = this.find(FIND_SOURCES) as Source[];
    }
    return this._sources;
};

Room.prototype.getMineral = function (): Mineral | undefined {
    const minerals = this.find(FIND_MINERALS) as Mineral[];
    if (minerals.length) {
        return minerals[0];
    }
    return undefined;
};
