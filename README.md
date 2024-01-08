## Screeps Autonomous Framework

Screeps Autonomous Framework is a starter kit for developing your own Screeps bot with TypeScript.

Begin your Screeps bot development journey with this minimal, well-structured framework, offering a solid foundation for you to innovate and implement your unique strategies.

## Get Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/download) (LTS) installed on your system.

### Install

1. Clone the source code or download and extract it.
2. Navigate to the project folder in your terminal.
3. Run `npm install` to install dependencies.

### Compile and Upload

Use the NPM scripts as aliases for Rollup commands to simplify the build and upload process.

1. Configure your Screeps server destinations.
   - Rename `screeps.sample.json` to `screeps.json`.
   - Update `screeps.json` with your Screeps credentials.
2. Use the NPM scripts in `package.json` as aliases for Rollup commands.
   - `npm run build` will compile but not upload.
   - `npm run push-main` will compile and upload to the "main" destination in `screeps.json`.

**Note:** For uploading code to a private server, you must create your username and password on the server with the help of [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth).

## Kudos

Special thanks to @kasami for inspiring this project with the original KasamiBot.
