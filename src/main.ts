import * as Core from 'managers/Core';
import * as Log from 'utils/log';

Log.alert('✨=== Global Reset ===✨');

export function loop() {
  Core.run();
}
