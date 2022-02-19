import * as amx from "@sa-mp/amx";

export class CrashDetectFunctions {
    public static printBacktrace(): void {
        amx.callNative("PrintBacktrace", "");
    }

    public static printNativeBacktrace(): void {
        amx.callNative("PrintNativeBacktrace", "");
    }

    public static getBacktrace(size: number): string {
        const [string] = amx.callNative("GetBacktrace", "Si", size, size);
        return string as string;
    }

    public static getNativeBacktrace(size: number): string {
        const [string] = amx.callNative("GetNativeBacktrace", "Si", size, size);
        return string as string;
    }
}