import {GameMode} from "@sa-mp/core";
import {CrashDetect, CrashDetectContextEvents} from ".";

export class CrashDetectExtension extends GameMode.Extension {
    public callEvent<EventName extends keyof CrashDetectContextEvents>(name: EventName, ...args: Parameters<CrashDetectContextEvents[EventName]>): number | undefined {
        return this.factory.callEvent(name, ...args);
    }

    public create(): void {
        CrashDetect.on("runtime-error", (crash, code) => {
            crash.retval = this.callEvent("onRuntimeError", crash, code);
        });
    }
}