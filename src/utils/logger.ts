import { LogLevel } from '../enums/loglevel';

export class Logger {
  public setLogLevel(level: LogLevel) {
    Memory.settings.loglevel = level;
  }

  public alert(message: string, roomName?: string) {
    this.log(LogLevel.Alert, '#ff00d8', message, roomName);
  }

  public success(message: string, roomName?: string) {
    this.log(LogLevel.Success, '#2e7d32', message, roomName);
  }

  public error(message: string, roomName?: string) {
    this.log(LogLevel.Error, '#d32f2f', message, roomName);
  }

  public warning(message: string, roomName?: string) {
    this.log(LogLevel.Warn, '#feda00', message, roomName);
  }

  public info(message: string, roomName?: string) {
    this.log(LogLevel.Info, '#efefef', message, roomName);
  }

  public debug(message: string, roomName?: string) {
    this.log(LogLevel.Debug, '#9a9a9a', message, roomName);
  }

  public verbose(message: string, roomName?: string) {
    this.log(LogLevel.Verbose, '#6e6770', message, roomName);
  }

  private log(level: LogLevel, color: string, message: string, roomName?: string) {
    if (Memory.settings?.loglevel && Memory.settings.loglevel < level) {
      return;
    }
    let output = '';
    if (roomName) {
      output += `<a href="#!/room/${Game.shard.name}/${roomName}">${roomName}</a>`;
      output += '<span style="color:#6e6770"> &rsaquo; </span>';
    }
    output += `<span style="color:${color}">${message}</span>`;
    console.log(output);
  }
}

export const log = new Logger();
