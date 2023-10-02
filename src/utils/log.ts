/**
 * The log utility provides colorful log message functionality.
 * @module
 */

import { LogLevel } from 'enums/logLevel';

/**
 * Updates the log level setting of the bot.
 * @param level The new log level for rendering log messages.
 */
export function setLogLevel(level: LogLevel) {
  Memory.settings.loglevel = level;
}

/**
 * Log an alert message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function alert(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Alert, '#ff1493', message, roomName, print);
}

/**
 * Log a success message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function success(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Success, '#32cd32', message, roomName, print);
}

/**
 * Log an error message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function error(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Error, '#ff2222', message, roomName, print);
}

/**
 * Log a warning message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function warning(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Warn, '#feda00', message, roomName, print);
}

/**
 * Log a message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function info(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Info, '#efefef', message, roomName, print);
}

/**
 * Log a debug message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function debug(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Debug, '#9a9a9a', message, roomName, print);
}

/**
 * Log a verbose debug message to the console.
 * @param message The message to log in the console.
 * @param roomName (optional) The room to link in the console.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
export function verbose(message: string, roomName?: string | null, print = true) {
  return send(LogLevel.Verbose, '#6e6770', message, roomName, print);
}

/**
 * Outputs a colorful log message.
 * @param level The level used to filter logs based on the log level setting.
 * @param color The color of the message.
 * @param message The log message.
 * @param roomName (optional) The room to link.
 * @param print (optional) Print using `console.log()` if true, otherwise returns the colorful log message.
 */
function send(level: LogLevel, color: string, message: string, roomName?: string | null, print = true) {
  if (Memory.settings?.loglevel && Memory.settings.loglevel < level) {
    return;
  }
  let output = '';
  if (roomName && roomName !== 'sim') {
    output += `<a href="#!/room/${Game.shard.name}/${roomName}">${roomName}</a>`;
    output += '<span style="color:#6e6770"> &rsaquo; </span>';
  }
  output += `<span style="color:${color}">${message}</span>`;
  if (print) {
    return console.log(output);
  }
  return output;
}
