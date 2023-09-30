import { Priority } from 'enums/priority';

export abstract class Manager {
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.memoryCheck();
  }

  public abstract run(pri: Priority): void;

  protected memoryCheck() {
    if (!Memory.manager) {
      Memory.manager = {};
    }
    if (!Memory.manager[this.name]) {
      Memory.manager[this.name] = {};
    }
  }

  protected getValue(name: string) {
    return Memory.manager[this.name][name];
  }

  protected setValue(name: string, value: number) {
    Memory.manager[this.name][name] = value;
  }
}
