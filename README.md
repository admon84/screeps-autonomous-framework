# AutoScreep Starter Bot

AutoScreep Starter Bot is designed to provide a solid foundation for your Screeps AI bot development. It serves as a base bot architecture, offering essential components such as task management and spawning systems. While it may not boast advanced AI capabilities out of the box, it lays the groundwork for your bot's growth and optimization. With AutoScreep Starter Bot, you can jumpstart your Screeps AI journey and build upon this robust foundation to create a bot tailored to your specific needs and objectives.

## Features

### Task Managers

Task Managers are essential for prioritizing tasks and managing Creep roles efficiently.

The Core Manager serves as the system's entry point, running other managers using a CPU-based priority system. This prioritization system ensures that critical tasks, such as operating Spawns and Towers, are executed first, and it can automatically skip lower priority tasks when the CPU bucket is running low.

### Spawn Manager

The Spawn Manager processes orders to spawn creeps from a priority-based queue.

### Operations

Operations allow you to create autonomous missions that focus on achieving specific goals.

### Services

Creep and Room Services provide task managers with efficient access to query for creeps and rooms.

### Prototypes

Prototypes enable you to extend regular Game objects with additional behaviors or optimizations.

## Getting Started

To get started with AutoScreep Starter Bot, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/en/download) (LTS recommended)

### Installation

1. Download and extract or clone the source code to a folder of your choice.

2. Open your terminal and navigate to the project folder.

3. Run `npm install` (or `yarn`) to install the required packages and TypeScript declaration files

### Rollup and Code Upload

AutoScreep Starter Bot utilizes Rollup to compile your TypeScript code and upload it to a Screeps server.

1. Move or copy `screeps.sample.json` to `screeps.json` and edit the file, providing your Screeps credentials. Optionally, you can add or remove some of the destinations based on your requirements.

2. The `package.json` includes NPM scripts that serve as aliases for the Rollup commands. For example, running `npm run push-main` will build and push using the "main" destination in your `screeps.json` file.

Note: For uploading code to a private server, you must have [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) installed and configured.

## Credits

This bot is heavily inspired by the public release of KasamiBot, and we extend our gratitude to Kasami for generously sharing their work!
