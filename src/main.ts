import * as Core from "./managers/Core";
import { log } from "./tools/Logger";

log.alert("✨=== Global Reset ===✨");

export function loop() {
    Core.run();
}
