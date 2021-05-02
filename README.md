# Screeps TypeScript Starter [Extended]

Screeps TypeScript Starter is a starting point for a Screeps AI written in Typescript. This extended version includes a sturdy framework based on KasamiBot.

This starter kit provides the same features covered in the Screeps Tutorial (Harvester Role, Upgrader Role, Builder Role, Spawn Logic, Tower Logic, and Memory Cleanup) plus a solid foundation for building a top-tier Screeps AI with TypeScript.

### Managers & Prioritization

Managers are used to prioritize components and Creep roles.

The Core manager's `run()` method is called in the main loop and executes all other managers using a CPU-based priority system.

Each manager component is called to run higher priority systems first and lower priority systems later with the possibility that lower priority systems may be skipped if the player's [CPU Bucket](https://docs.screeps.com/cpu-limit.html) has been depleted.

This prioritization system allows the player to organize critical and important systems (such as Towers or Room Defense systems) to always run first and foremost.

### Other Prominent Systems

The Orders repository and Spawn manager work together to provide a priority-based queue for spawning creeps that have been ordered by other managers.

The Creep and Room services provide a dictionary-style wrapper to Game.creeps and Game.rooms respectively, with helper methods for finding creeps or rooms that match specified criteria.

The Profiles utility is used to define bodies for specialized Creep roles, with a scalable and recursive pattern.

Operations can be used to created autonomous "missions" that enable one or more rooms to support a single goal.

Prototypes can be used to extend regular Game objects with additional helper methods or optimizations.

Roles are specialized Creep behaviors.  The Builder, Harvester and Upgrader roles provided in this starter kit are state-based versions of the same roles covered in the Screeps Tutorial.

## Basic Usage

You will need:

- [Node.JS](https://nodejs.org/en/download) (10.x || 12.x)
- A Package Manager ([Yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://docs.npmjs.com/getting-started/installing-node))
- Rollup CLI (Optional, install via `npm install -g rollup`)

Download the latest source [here](https://github.com/admon84/screeps-typescript-starter/archive/master.zip) and extract it to a folder.

Open the folder in your terminal and run your package manager to install the required packages and TypeScript declaration files:

```bash
# npm
npm install

# yarn
yarn
```

Fire up your preferred editor with typescript installed and you are good to go!

### Rollup and code upload

Screeps Typescript Starter uses rollup to compile your typescript and upload it to a screeps server.

Move or copy `screeps.sample.json` to `screeps.json` and edit it, changing the credentials and optionally adding or removing some of the destinations.

Running `rollup -c` will compile your code and do a "dry run", preparing the code for upload but not actually pushing it. Running `rollup -c --environment DEST:main` will compile your code, and then upload it to a screeps server using the `main` config from `screeps.json`.

You can use `-cw` instead of `-c` to automatically re-run when your source code changes - for example, `rollup -cw --environment DEST:main` will automatically upload your code to the `main` configuration every time your code is changed.

Finally, there are also NPM scripts that serve as aliases for these commands in `package.json` for IDE integration. Running `npm run push-main` is equivalent to `rollup -c --environment DEST:main`, and `npm run watch-sim` is equivalent to `rollup -cw --dest sim`.

#### Important! To upload code to a private server, you must have [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) installed and configured!

## Typings

The type definitions for Screeps come from [typed-screeps](https://github.com/screepers/typed-screeps). If you find a problem or have a suggestion, please open an issue there.
