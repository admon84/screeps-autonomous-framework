/**
 * Priority levels ensure important tasks are performed first.
 *
 * Spawns use the priority on orders to spawn more important creeps first.
 */

export enum Priority {
  Blocker = 0,
  Critical = 1,
  Important = 2,
  Standard = 3,
  Low = 4,
  Trivial = 5,
  Overflow = 6
}
