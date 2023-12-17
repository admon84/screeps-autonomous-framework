[![repo](https://custom-icon-badges.demolab.com/badge/repo-dodgerblue.svg?logo=repo)](https://github.com/admon84/screeps-autonomous-framework)
[![docs](https://custom-icon-badges.demolab.com/badge/docs-seagreen.svg?logo=book)](https://admon84.github.io/screeps-autonomous-framework/)

## Screeps Autonomous Framework

Welcome to the Screeps Autonomous Framework. This framework is a structured starting point for developing your own bot for Screeps World, a strategy game for programmers.

### **Key Features**

- **Solid Foundation:** A well-organized base for you to focus on innovation.
- **Developer Friendly:** Clear and thoughtful design patterns for straightforward and error-free development.
- **Educational:** A learning tool for understanding autonomous bot creation, regardless of your Screeps experience level.
- **Flexible & Customizable:** Adaptable design allowing for extensive customization to meet your specific needs.

## **Get Started**

Leverage the Screeps Autonomous Framework as your launchpad for bot development. Customize it to create an advanced bot that aligns with your objectives.

### **Requirements**

- [Node.js](https://nodejs.org/en/download) (LTS recommended)

### **Installation**

1. Clone the source code or download and extract it to your preferred directory.
2. Navigate to the project folder using your terminal.
3. Run `npm i` or `yarn` to install the dependencies.

### **Rollup and Code Upload**

The Screeps Autonomous Framework employs Rollup for compiling your TypeScript code and uploading it to a Screeps server.

1. Rename `screeps.sample.json` to `screeps.json` and update it with your Screeps credentials. Modify the destinations as needed to suit your requirements.
2. Utilize the NPM scripts in `package.json` as aliases for Rollup commands; for instance, `npm run push-main` will build and upload using the "main" destination in your `screeps.json` file.

**Note:** For uploading code to a private server, [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) must be installed and configured properly.

## **Acknowledgments**

Special thanks to Kasami for inspiring this project and openly sharing his innovative work on KasamiBot!
