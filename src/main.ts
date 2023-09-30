import * as Core from 'managers/core';
import { alert } from 'utils/log';

alert('✨=== Global Reset ===✨');

export function loop() {
  Core.run();
}
