// jest.config.mjs
import { createDefaultPreset } from "ts-jest";

/** @type {import("jest").Config} */
export default {
  preset: "ts-jest/presets/default-esm", // preset pour ESM
  testEnvironment: "node",
  transform: {
    ...createDefaultPreset().transform,
  },
  moduleFileExtensions: ["ts","js"],
};
