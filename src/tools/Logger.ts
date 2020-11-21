import { LogLevel } from "../enums/loglevel";

export class Logger {
    public setLogLevel(newLevel: LogLevel) {
        Memory.settings.loggingLevel = newLevel;
    }

    private _log(message: string, room: string | undefined, level: LogLevel, color = "#fff") {
        if (this._shouldLogMessage(level)) {
            let output = "";
            if (room) {
                output += `<a href="#!/room/${Game.shard.name}/${room}">${room}</a>`;
                output += '<span style="color:#6e6770"> &rsaquo; </span>';
            }
            output += `<span style="color:${color}">${message}</span>`;
            console.log(output);
        }
    }

    private _shouldLogMessage(level: LogLevel) {
        if (Memory.settings?.loggingLevel === undefined) {
            return true;
        }
        if (level <= Memory.settings.loggingLevel) {
            return true;
        }
        return false;
    }

    public alert(message: string, room?: string) {
        this._log(message, room, LogLevel.Alert, "#ff00d0");
    }

    public error(message: string, room?: string) {
        this._log(message, room, LogLevel.Error, "#e50000");
    }

    public warning(message: string, room?: string) {
        this._log(message, room, LogLevel.Warn, "#f4c542");
    }

    public info(message: string, room?: string) {
        this._log(message, room, LogLevel.Info, "#efefef");
    }

    public debug(message: string, room?: string) {
        this._log(message, room, LogLevel.Debug, "#a6a4a6");
    }

    public verbose(message: string, room?: string) {
        this._log(message, room, LogLevel.Verbose, "#6e6770");
    }
}

export const log = new Logger();
