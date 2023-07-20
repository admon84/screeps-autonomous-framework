import * as Core from './managers/Core';
import { log } from './utils/logger';

log.alert('✨=== Global Reset ===✨');

export function loop() {
  Core.run();
}
