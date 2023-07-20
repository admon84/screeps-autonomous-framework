/**
 * SimpleWorkers are balanced with equal parts WORK, CARRY, and MOVE
 */
const SIMPLE_WORKER_MAX_TIER = 16;

export function getSimpleWorkerBody(tier: number) {
  if (tier > SIMPLE_WORKER_MAX_TIER) {
    tier = SIMPLE_WORKER_MAX_TIER;
  }
  return addToBody([], tier, [WORK, CARRY, MOVE]);
}

export function getMaxTierSimpleWorker(energy: number) {
  return getMaxTier(energy, getSimpleWorkerBody, SIMPLE_WORKER_MAX_TIER);
}

/**
 * HeavyWorkers have more WORK, less CARRY, and need roads to MOVE effectively
 */
const HEAVY_WORKER_MAX_TIER = 16;

export function getHeavyWorkerBody(tier: number) {
  if (tier > HEAVY_WORKER_MAX_TIER) {
    tier = HEAVY_WORKER_MAX_TIER;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, Math.floor(tier / 2), [WORK, WORK, MOVE]);
  body = addToBody(body, Math.ceil(tier / 2), [WORK, CARRY, MOVE]);
  return body;
}

export function getMaxTierHeavyWorker(energy: number) {
  return getMaxTier(energy, getHeavyWorkerBody, HEAVY_WORKER_MAX_TIER);
}

/**
 * Calculate the total cost for a creep body
 */
export function getCostForBody(body: BodyPartConstant[]) {
  let cost = 0;
  for (const bodypart of body) {
    cost += getCostForBodypart(bodypart);
  }
  return cost;
}

/**
 * Find the max tier possible based on energy and function
 */
function getMaxTier(energy: number, bodyfunction: Function, maxTier: number) {
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
function getCostForBodypart(part: BodyPartConstant) {
  if (part in BODYPART_COST) {
    return BODYPART_COST[part];
  }
  return 0;
}

/**
 * Add parts to a creep body array
 */
function addToBody(body: BodyPartConstant[], count: number, parts: BodyPartConstant[]) {
  for (let i = 0; i < count; i++) {
    body.push(...parts);
  }
  return body;
}
