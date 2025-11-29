/** @internal */
export declare enum LogLevel {
    Error = 1,
    Warning = 2,
    Message = 4,
    Success = 8,
    Info = 16,
    Debug = 32,
    All = 63
}
/**
 * Adds a message to the element with id "status". The messages are prepended with
 * time and type of message, in this case [mesg].
 */
export declare function msg(message: string): void;
/**
 * Adds a warning message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [warn].
 */
export declare function warn(message: string): void;
/**
 * Adds a debugging message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [dbug].
 */
export declare function debug(message: string): void;
/**
 * Adds a info message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [info].
 */
export declare function info(message: string): void;
/**
 * Adds a error to the element with id "status". The messages are
 * prepended with time and type of message, in this case [eror].
 */
export declare function error(message: string): void;
/**
 * Adds a success message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [good].
 */
export declare function success(message: string): void;
/**
 * Uses the global alert to send an alert. If global alert is not available, it
 * will output the message using the method [[warning]]s.
 */
export declare function alert(message: string): void;
/**
 * Will clear the content of the element with id "status".
 */
export declare function clear(): void;
/**
 * Lets you configure which types of messages will be shown. The module uses
 * [bitmask](https://en.wikipedia.org/wiki/Mask_(computing)) to filter which
 * types of messages should be shown. E.g. if you only want warning messages
 * to be shown, pass 2 to the function, if you want warning and success to be
 * shown, pass 10 (2+8). By passing the sum of all, 63, you'll show all
 * types of messages.
 *
 * - Error: 1
 * - Warning: 2
 * - Message: 4
 * - Success: 8
 * - Info: 16
 * - Debug: 32
 */
export declare function setLevel(level: number): void;
/**
 * Will dump the current HTML using the [[debug]] method.
 */
export declare function dumpHTML(): void;
/**
 * Will start prepending messages the list of log messages.
 */
export declare function logAscending(): void;
/**
 * Will start appending messages the list of log messages. (This is default
 * behavior.)
 */
export declare function logDescending(): void;
/** @internal */
export declare function escapeForXML(str: string): string;
/** @internal */
export declare function setInternals(window: any, document: any): void;
//# sourceMappingURL=log.d.ts.map