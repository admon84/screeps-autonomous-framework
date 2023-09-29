import { LogLevel } from 'enums/loglevel';

export function setLogLevel(level: LogLevel) {
  Memory.settings.loglevel = level;
}

export function alert(message: string, roomName?: string) {
  sendLog(LogLevel.Alert, '#ff00d8', message, roomName);
}

export function success(message: string, roomName?: string) {
  sendLog(LogLevel.Success, '#2e7d32', message, roomName);
}

export function error(message: string, roomName?: string) {
  sendLog(LogLevel.Error, '#d32f2f', message, roomName);
}

export function warning(message: string, roomName?: string) {
  sendLog(LogLevel.Warn, '#feda00', message, roomName);
}

export function info(message: string, roomName?: string) {
  sendLog(LogLevel.Info, '#efefef', message, roomName);
}

export function debug(message: string, roomName?: string) {
  sendLog(LogLevel.Debug, '#9a9a9a', message, roomName);
}

export function verbose(message: string, roomName?: string) {
  sendLog(LogLevel.Verbose, '#6e6770', message, roomName);
}

function sendLog(level: LogLevel, color: string, message: string, roomName?: string) {
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
