/**
 * RoomPosition prototypes
 */

RoomPosition.prototype.isEdge = function () {
    if (this._isEdge === undefined) {
        this._isEdge = this.x === 0 || this.x === 49 || this.y === 0 || this.y === 49;
    }
    return this._isEdge;
};

RoomPosition.prototype.isNearEdge = function () {
    if (this._isNearEdge === undefined) {
        this._isNearEdge = this.x === 1 || this.x === 48 || this.y === 1 || this.y === 48;
    }
    return this._isNearEdge;
};
