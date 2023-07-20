// Prototype files are imported in CoreManager

interface Creep {
  getState(): number | undefined;
  setState(state: number): void;
  hasState(): boolean;
  getHomeroom(): string;
  isInHomeroom(): boolean;
  isEmpty(): boolean;
  isFull(): boolean;
}

interface Room {
  getMySpawns(): StructureSpawn[];
  getSpawn(): StructureSpawn | undefined;
  getSources(): Source[];
  getMineral(): Mineral | null;
}
