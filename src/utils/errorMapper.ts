import { SourceMapConsumer } from 'source-map';
import * as log from './log';

/**
 * Set to `true` to enable error mapping.
 */
export const USE_ERROR_MAPPER = true;

/**
 * ErrorMapper
 *
 * This error mapper is designed to wrap the main `loop` function in a try/catch block
 * and provide stack traces which are mapped to your source code via source maps.
 *
 * This allows you to see the original source code when an error occurs, rather than
 * the compiled code, making debugging much nicer.
 *
 * This does however come with a CPU cost, especially on the first call after a reset,
 * so you can disable this feature by setting `USE_ERROR_MAPPER` to `false` if needed.
 */
export class ErrorMapper {
  // Cache consumer
  private static _consumer?: SourceMapConsumer;
  private static _regexPrefix = /^\.\.\//;
  private static _regexSearch = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\/]+):(\d+):(\d+)\)?$/gm;

  public static get consumer(): SourceMapConsumer {
    if (!this._consumer) {
      this._consumer = new SourceMapConsumer(require('main.js.map'));
    }
    return this._consumer;
  }

  // Cache previously mapped traces to improve performance
  public static cache: { [key: string]: string } = {};

  /**
   * Generates a stack trace using a source map generate original symbol names.
   *
   * WARNING - EXTREMELY high CPU cost for first call after reset - >30 CPU!
   * (Consecutive calls after a reset are more reasonable, ~0.1 CPU/ea)
   *
   * @param {Error | string} error The error or original stack trace
   * @returns {string} The source-mapped stack trace
   */
  public static sourceMappedStackTrace(error: Error | string): string {
    const stack: string = error instanceof Error ? (error.stack as string) : error;
    if (Object.prototype.hasOwnProperty.call(this.cache, stack)) {
      return this.cache[stack];
    }

    let match: RegExpExecArray | null;
    let outStack = error.toString();

    while ((match = this._regexSearch.exec(stack))) {
      if (match[2] === 'main') {
        const pos = this.consumer.originalPositionFor({ column: parseInt(match[4], 10), line: parseInt(match[3], 10) });

        if (pos.line != null) {
          const file = pos.source.replace(this._regexPrefix, '');
          if (pos.name) {
            outStack += `\n    at ${pos.name} (${file}:${pos.line}:${pos.column})`;
          } else {
            if (match[1]) {
              // no original source file name known - use file name from given trace
              outStack += `\n    at ${match[1]} (${file}:${pos.line}:${pos.column})`;
            } else {
              // no original source file name known or in given trace - omit name
              outStack += `\n    at ${file}:${pos.line}:${pos.column}`;
            }
          }
        } else {
          // no known position
          break;
        }
      } else {
        // no more parseable lines
        break;
      }
    }

    this.cache[stack] = outStack;
    return outStack;
  }

  public static wrapLoop(loop: () => void): () => void {
    return () => {
      try {
        loop();
      } catch (e) {
        if (e instanceof Error) {
          if ('sim' in Game.rooms || Game.cpu.bucket < Game.cpu.tickLimit) {
            // Display original error in simulator or when bucket is very low
            log.error(_.escape(e.stack));
          } else {
            log.error(_.escape(this.sourceMappedStackTrace(e)));
          }
          return;
        }

        // can't handle it
        throw e;
      }
    };
  }
}
