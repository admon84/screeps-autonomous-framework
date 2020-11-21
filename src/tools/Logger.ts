import { LogLevel } from "../enums/loglevel";

export class Logger {
    public setLogLevel(newLevel: LogLevel) {
        Memory.settings.loggingLevel = newLevel;
    }

    private _log(message: string, room: string, logLevel: LogLevel, color = "#ffffff") {
        if (logLevel <= Memory.settings.loggingLevel) {
            const roomlink = '<a href="#!/room/' + Game.shard.name + "/" + room + '">' + room + "</a>";
            const separator = '<span style="color:#6e6770"> &rsaquo; </span>';
            const details = '<span style="color:' + color + '">' + message + "</span>";
            console.log(roomlink + separator + details);
        }
    }

    public alert(message: string, room: string) {
        this._log(message, room, LogLevel.Alert, "#ff00d0");
    }

    public error(message: string, room: string) {
        this._log(message, room, LogLevel.Error, "#e50000");
    }

    public warning(message: string, room: string) {
        this._log(message, room, LogLevel.Warn, "#f4c542");
    }

    public info(message: string, room: string) {
        this._log(message, room, LogLevel.Info);
    }

    public debug(message: string, room: string) {
        this._log(message, room, LogLevel.Debug, "#a6a4a6");
    }

    public verbose(message: string, room: string) {
        this._log(message, room, LogLevel.Verbose, "#6e6770");
    }
}

export const log = new Logger();
