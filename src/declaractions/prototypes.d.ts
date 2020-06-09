// Prototype files are imported in CoreManager

interface Creep {
    getState(): number | undefined;
    setState(state: number): void;
    hasState(): boolean;
    getHomeroom(): string;
    isInHomeroom(): boolean;
    isEnergyEmpty(): boolean;
    isEmpty(): boolean;
    isCarrying(): boolean;
    isFull(): boolean;
}

interface Room {
    getMySpawns(): StructureSpawn[];
    getSpawn(): StructureSpawn | undefined;
    getSources(): Source[];
    getMineral(): Mineral | undefined;
}

interface RoomPosition {
    isBorder(pos: RoomPosition): boolean;
    isBorderOrNextToBorder(pos: RoomPosition): boolean;
    isNextToBorder(pos: RoomPosition): boolean;
}