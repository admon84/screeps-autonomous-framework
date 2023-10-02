import { Priority } from 'enums/priority';

/**
 * The `Manager` class serves as the foundational abstract class for all manager-type classes within
 * the framework, orchestrating the general behaviors and functionalities shared amongst them.
 *
 * This class should not be instantiated directly but instead should be extended by other manager classes
 * requiring foundational functionalities and structures.
 */

export abstract class Manager {
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.memoryCheck();
  }

  public abstract run(pri: Priority): void;

  protected memoryCheck() {
    if (!Memory.managers) {
      Memory.managers = {};
    }
    if (!Memory.managers[this.name]) {
      Memory.managers[this.name] = {};
    }
  }

  protected getValue(name: string) {
    return Memory.managers[this.name][name];
  }

  protected setValue(name: string, value: number) {
    Memory.managers[this.name][name] = value;
  }
}
