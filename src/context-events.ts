import {CrashDetect} from ".";

export interface OnRuntimeError {
    onRuntimeError(crash: CrashDetect, code: number): any;
}

export interface CrashDetectContextEvents extends OnRuntimeError {}