/**
 * RoomPosition prototypes
 */

RoomPosition.prototype.isBorder = function (): boolean {
    return this.x === 0 || this.x === 49 || this.y === 0 || this.y === 49;
};

RoomPosition.prototype.isBorderOrNextToBorder = function (): boolean {
    return this.x <= 1 || this.x >= 48 || this.y <= 1 || this.y >= 48;
};

RoomPosition.prototype.isNextToBorder = function (): boolean {
    return this.x === 1 || this.x === 48 || this.y === 1 || this.y === 48;
};
