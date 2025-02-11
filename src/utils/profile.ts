/**
 * The profile utility provides methods to assemble creep body arrays.
 * @module
 */

/**
 * Assembles a body for a Simple Worker creep which has 1:1 WORK to CARRY parts.
 * @param tier The scaling size of the creep body.
 * @returns The creep body array.
 */
export function getSimpleWorkerBody(tier: number) {
  const parts = [WORK, MOVE, CARRY, MOVE];
  const maxTier = Math.floor(MAX_CREEP_SIZE / parts.length);
  if (tier > maxTier) {
    tier = maxTier;
  }
  return addToBody([], tier, parts);
}

/**
 * Determines the maximum size for a Simple Worker creep based on energy.
 * @param energy The maximum amount of energy to use for spawning the creep body.
 * @returns The maximum tier for the amount of energy.
 */
export function getMaxTierSimpleWorker(energy: number) {
  return getMaxTier(energy, getSimpleWorkerBody);
}

/**
 * Assembles a body for a Heavy Worker creep which has 3:1 WORK to CARRY parts.
 * @param tier The scaling size of the creep body.
 * @returns The creep body array.
 */
export function getHeavyWorkerBody(tier: number) {
  const workParts = [WORK, WORK, MOVE, MOVE];
  const carryParts = [WORK, CARRY, MOVE, MOVE];
  const partsPerTier = [...workParts, ...carryParts];
  const maxTier = Math.floor(MAX_CREEP_SIZE / partsPerTier.length);
  if (tier > maxTier) {
    tier = maxTier;
  }
  let body: BodyPartConstant[] = [];
  body = addToBody(body, Math.floor(tier / 2), workParts);
  body = addToBody(body, Math.ceil(tier / 2), carryParts);
  return body;
}

/**
 * Determines the maximum size for a Heavy Worker creep based on energy.
 * @param energy The maximum amount of energy to use for spawning the creep body.
 * @returns The maximum tier for the amount of energy.
 */
export function getMaxTierHeavyWorker(energy: number) {
  return getMaxTier(energy, getHeavyWorkerBody);
}

/**
 * Calculate the total energy cost to spawn a creep based on a body array.
 * @param body The creep body array to evaluate.
 */
export function getCostForBody(body: BodyPartConstant[]) {
  let cost = 0;
  for (const bodypart of body) {
    cost += BODYPART_COST[bodypart];
  }
  return cost;
}

/**
 * Determines the maximum size based on energy for a creep body method.
 *
 */
function getMaxTier(energy: number, bodyFunction: Function) {
  let tier = 0;
  let maxReached = false;
  for (let i = 1; !maxReached; i++) {
    const cost = getCostForBody(bodyFunction(i));
    if (cost > energy || bodyFunction(i).length > MAX_CREEP_SIZE) {
      maxReached = true;
    } else {
      tier = i;
    }
  }
  return tier;
}

/**
 * Add parts to a creep body array.
 */
function addToBody(body: BodyPartConstant[], count: number, parts: BodyPartConstant[]) {
  for (let i = 0; i < count; i++) {
    body.push(...parts);
  }
  return body;
}
