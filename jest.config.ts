import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["./src"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
};
export default config;
