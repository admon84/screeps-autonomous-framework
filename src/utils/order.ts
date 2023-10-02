/**
 * The order utility provides methods for managing orders to spawn creeps.
 * @module
 */

import { Order } from 'classes/order';
import { Role } from 'enums/role';
import { error, info, verbose } from 'utils/log';
import { getCostForBody } from 'utils/profile';

/**
 * Insert a new order into the orders queue for spawning a creep.
 * @param room The `Room` that will spawn the creep.
 * @param order The `Order` containing details about the creep.
 */
export function orderCreep(room: Room, order: Order) {
  if (!room.getMySpawn()) {
    return false;
  }

  const orderBodyCost = getCostForBody(order.body);
  if (orderBodyCost > room.energyCapacityAvailable) {
    error('Creep ordered is more expensive than the room energy capacity: ' + JSON.stringify(order.memory), room.name);
    return false;
  }

  if (order.body.length === 0) {
    error('Invalid creep ordered, empty body: ' + JSON.stringify(order.memory), room.name);
    return false;
  }

  if (order.body.length > 50) {
    error('Invalid creep ordered, body larger than 50: ' + JSON.stringify(order.memory), room.name);
    return false;
  }

  if (!room.memory.orders) {
    room.memory.orders = [];
  }

  room.memory.orders.push(order);

  const role = Role[order.memory.role];
  const length = room.memory.orders.length - 1;
  verbose(`Ordered: ${role} (${order.memory.target}) - Queue: ${length}`, room.name);

  return true;
}

/**
 * Get number of creep orders with same role and target, where either can be null to skip matching.
 * @param room The `Room` used to find orders.
 * @param role (optional) The `Role` to search for matching orders.
 * @param target (optional) The target room name to search for matching orders.
 */
export function getCreepsInQueue(room: Room, role: Role | null = null, target: string | null = null) {
  if (!room.memory.orders) {
    room.memory.orders = [];
  }

  let count = 0;
  for (const order of room.memory.orders) {
    if ((target === null || order.memory.target === target) && (role === null || order.memory.role === role)) {
      count++;
    }
  }
  return count;
}

/**
 * Clear orders queue for the specified room.
 * @param room The `Room` used to clear orders.
 */
export function clearOrders(room: Room) {
  room.memory.orders = [];
  info('Clearing order queue for room', room.name);
}

/**
 * Create unique identifier.
 * @param prefix (optional) The string to prepend before the unique identifier.
 */
export function getUniqueId(prefix = '_') {
  let id = prefix;
  const charset = '0123456789ABCDEF';
  for (let i = 0; i < 4; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return id;
}
