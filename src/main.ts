import * as Core from "./managers/Core";

import { log } from "./tools/Logger";

log.alert("==== Script Reloaded ====");

export function loop() {
    Core.run();
}
