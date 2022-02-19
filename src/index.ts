import * as amx from "@sa-mp/amx";
import {EventEmitter, DefaultEventMap} from "tsee";
import {CrashDetectFunctions} from "./functions";

export * from "./functions";
export * from "./extension";
export * from "./context-events";

export interface CrashDetectEventMap extends DefaultEventMap {
    "runtime-error": (crash: CrashDetect, code: number) => any;
}

export class CrashDetect extends CrashDetectFunctions {
    public static readonly events: EventEmitter<CrashDetectEventMap> = new EventEmitter;
    public static readonly on = CrashDetect.events.on;

    public static init(): void {
        amx.onPublicCall("OnRuntimeError", "i", (code) => {
            const crash = new CrashDetect;
            return CrashDetect.emit("runtime-error", crash, crash, code as number);
        });
    }

    public static emit<EventKey extends keyof CrashDetectEventMap>(key: EventKey, crash: CrashDetect, ...args: Parameters<CrashDetectEventMap[EventKey]>): number | void {
        CrashDetect.events.emit(key, ...args);
        const {retval} = crash;
        if(typeof retval === "number")
            return retval;
    }

    public retval?: number;
}

CrashDetect.init();