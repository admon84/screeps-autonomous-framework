# Screeps Bot Framework

An extension of the Screeps TypeScript Starter for developing your own Screeps bot/AI.

Functionally this bot includes the same basic features covered in the [Screeps Tutorial](https://screeps.com/a/#!/sim/tutorial).

- Harvester, Upgrader, and Builder roles
- Spawn Logic
- Tower Logic
- Memory Cleanup

Additionally this codebase provides a bot framework that can be used to craft a top-tier Screeps AI.

- Task Managers
- Priority Spawn Queue
- Services
- Creep Body Profiles
- Operations
- Prototypes

### Task Managers

Managers are used to prioritize tasks and Creep roles.

Core manager's `run()` method entry point for the system which runs other managers using a CPU-based priority system.

The CPU-based priority system runs critical/important tasks first (such as operating Spawns and Towers) and can skip lower priority tasks if the CPU bucket has diminished.

### Priority Spawn Queue

Spawn manager uses an Orders repository which is a Creep spawning queue sorted by the priority of the order.

### Services

Creep and Room Services are a dictionary wrapper foor `Game.creeps` and `Game.rooms` containing helper methods for finding creeps or rooms that match specified criteria.

### Creep Body Profiles

The Profiles utility is used to define the body shape and size of specialized Creep roles using a scalable and recursive pattern.

### Operations

Operations can be used to created autonomous "missions" that enable one or more rooms to support a single goal.

### Prototypes

Prototypes can be used to extend regular Game objects with additional helper methods or optimizations.

## Basic Usage

You will need:

- [Node.JS](https://nodejs.org/en/download) (LTS recommended)
- A Package Manager ([npm](https://docs.npmjs.com/getting-started/installing-node) or [Yarn](https://yarnpkg.com/en/docs/getting-started))

Download the latest source [here](https://github.com/admon84/screeps-typescript-starter/archive/master.zip) and extract it to a folder.

Open the folder in your terminal and run your package manager to install the required packages and typescript declaration files:

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
