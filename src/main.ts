import * as Core from 'managers/Core';
import { alert } from 'utils/log';

alert('✨=== Global Reset ===✨');

export function loop() {
  Core.run();
}
