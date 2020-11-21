import * as ProfilesUtilities from "../utilities/Profiles";

import { Order } from "../classes/Order";

import { Role } from "../enums/role";

import { log } from "../tools/Logger";

/**
 * Insert a new creep order into the room orders queue
 */
export function orderCreep(room: Room, order: Order): boolean {
    if (room.getSpawn() === undefined) {
        return false;
    }
    const costOfCreep = ProfilesUtilities.getCostForBody(order.body);
    if (costOfCreep > room.energyCapacityAvailable) {
        log.error(
            "Creep ordered that is more expensive than the room is able to handle: " + JSON.stringify(order.memory),
            room.name
        );
        return false;
    }
    if (order.body.length === 0) {
        log.error("Invalid creep ordered, empty body: " + JSON.stringify(order.memory), room.name);
        return false;
    }
    if (order.body.length > 50) {
        log.error("Invalid creep ordered, body larger than 50: " + JSON.stringify(order.memory), room.name);
        return false;
    }
    if (room.memory.orders === undefined) {
        room.memory.orders = [];
    }

    room.memory.orders.push(order);

    const role = Role[order.memory.role];
    const length = room.memory.orders.length - 1;
    log.verbose(`Ordered ${role} (target: ${order.memory.target}) - Queue: ${length}`, room.name);

    return true;
}

/**
 * Get number of creep orders with same role and target, where either can be null to skip matching
 */
export function getCreepsInQueue(room: Room, role: Role | null = null, target: string | null = null): number {
    if (room.memory.orders === undefined) {
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
export function clearOrders(room: Room): void {
    room.memory.orders = [];
    log.info("Clearing order queue for room", room.name);
}
