import * as ProfileLib from '../lib/profile';
import { Order } from '../classes/Order';
import { Role } from '../enums/role';
import { log } from '../utils/logger';

/**
 * Insert a new creep order into the room orders queue
 */
export function orderCreep(room: Room, order: Order) {
  if (!room.getMySpawn()) {
    return false;
  }

  const orderBodyCost = ProfileLib.getCostForBody(order.body);
  if (orderBodyCost > room.energyCapacityAvailable) {
    log.error(
      'Creep ordered is more expensive than the room energy capacity: ' + JSON.stringify(order.memory),
      room.name
    );
    return false;
  }

  if (order.body.length === 0) {
    log.error('Invalid creep ordered, empty body: ' + JSON.stringify(order.memory), room.name);
    return false;
  }

  if (order.body.length > 50) {
    log.error('Invalid creep ordered, body larger than 50: ' + JSON.stringify(order.memory), room.name);
    return false;
  }

  if (!room.memory.orders) {
    room.memory.orders = [];
  }

  room.memory.orders.push(order);

  const role = Role[order.memory.role];
  const length = room.memory.orders.length - 1;
  log.verbose(`Ordered: ${role} (${order.memory.target}) - Queue: ${length}`, room.name);

  return true;
}

/**
 * Get number of creep orders with same role and target, where either can be null to skip matching
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
 * Clear orders queue for the specified room
 */
export function clearOrders(room: Room) {
  room.memory.orders = [];
  log.info('Clearing order queue for room', room.name);
}

/**
 * Create unique identifier
 */
export function getUniqueId(prefix = '_') {
  let id = prefix;
  const charset = '0123456789ABCDEF';
  for (let i = 0; i < 4; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return id;
}
