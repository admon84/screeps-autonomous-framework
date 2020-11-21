/**
 * SimpleWorkers are balanced with equal parts WORK, CARRY, and MOVE
 */
export function getSimpleWorkerBody(tier: number): BodyPartConstant[] {
    if (tier > 16) {
        tier = 16;
    }
    return addToBody([], tier, [WORK, CARRY, MOVE]);
}
export function getMaxTierSimpleWorker(energy: number): number {
    return getMaxTier(energy, getSimpleWorkerBody, 16);
}

/**
 * HeavyWorkers have more WORK, less CARRY, and need roads to MOVE effectively
 */
export function getHeavyWorkerBody(tier: number): BodyPartConstant[] {
    if (tier > 16) {
        tier = 16;
    }
    let body: BodyPartConstant[] = [];
    body = addToBody(body, Math.floor(tier / 2), [WORK, WORK, MOVE]);
    body = addToBody(body, Math.ceil(tier / 2), [WORK, CARRY, MOVE]);
    return body;
}
export function getMaxTierHeavyWorker(energy: number): number {
    return getMaxTier(energy, getHeavyWorkerBody, 16);
}

/**
 * Calculate the total cost for a creep body
 */
export function getCostForBody(body: BodyPartConstant[]): number {
    let cost = 0;
    for (const bodypart of body) {
        cost += getCostForBodypart(bodypart);
    }
    return cost;
}

/**
 * Find the max tier possible based on energy and function
 */
function getMaxTier(energy: number, bodyfunction: Function, maxTier: number): number {
    let tier = 0;
    let maxReached = false;
    for (let i = 1; !maxReached; i++) {
        const cost = getCostForBody(bodyfunction(i));
        if (cost > energy || i > maxTier) {
            maxReached = true;
        } else {
            tier = i;
        }
    }
    return tier;
}

/**
 * Determine cost for each creep body part
 */
function getCostForBodypart(part: BodyPartConstant): number {
    if (part in BODYPART_COST) {
        return BODYPART_COST[part];
    }
    return 0;
}

/**
 * Add parts to a creep body array
 */
function addToBody(body: BodyPartConstant[], count: number, parts: BodyPartConstant[]): BodyPartConstant[] {
    for (let i = 0; i < count; i++) {
        for (const part of parts) {
            body.push(part);
        }
    }
    return body;
}
