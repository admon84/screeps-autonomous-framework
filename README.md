[![repo](https://custom-icon-badges.demolab.com/badge/repo-dodgerblue.svg?logo=repo)](https://github.com/admon84/screeps-autonomous-framework)
[![docs](https://custom-icon-badges.demolab.com/badge/docs-seagreen.svg?logo=book)](https://admon84.github.io/screeps-autonomous-framework/)

## Screeps Autonomous Framework

Welcome to the Screeps Autonomous Framework project. This framework is intended for those who are seeking to develop a bot for Screeps — a strategy game for programmers. This isn't a ready-to-deploy bot filled with advanced features, but rather, it's a structured starting point, offering clean and clear design patterns to build upon.

### **Key Features**

- **Solid Foundation:** Provides a well-organized base, allowing you to solely focus on building and innovating.
- **Developer Friendly:** The framework's design patterns are thoughtful and clear, making bot development more straightforward and less error-prone.
- **Educational:** Regardless of your experience level with Screeps, this framework serves as a learning tool to understand the principles of autonomous bot creation effectively.
- **Flexible & Customizable:** Designed to be adaptable, it allows for extensive enhancements and modifications to fit your specific requirements and goals.

## **Get Started**

The Screeps Autonomous Framework is here to aid you in developing a bot that meets your exact needs. Utilize this framework as your starting point and customize it to create a bot with advanced capabilities tailored to your goals.

### **Requirements**

Before diving in, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (LTS recommended)

### **Installation**

1. Clone the source code or download and extract it to your preferred directory.
2. Navigate to the project folder using your terminal.
3. Run `npm install` or `yarn` to install the necessary packages and TypeScript declaration files.

### **Rollup and Code Upload**

The Screeps Autonomous Framework employs Rollup for compiling your TypeScript code and uploading it to a Screeps server.

1. Rename `screeps.sample.json` to `screeps.json` and update it with your Screeps credentials. Modify the destinations as needed to suit your requirements.
2. Utilize the NPM scripts in `package.json` as aliases for Rollup commands; for instance, `npm run push-main` will build and upload using the "main" destination in your `screeps.json` file.

**Note:** For uploading code to a private server, [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) must be installed and configured properly.

## **Acknowledgments**

Special thanks to Kasami for inspiring this project and openly sharing his innovative work on KasamiBot!
