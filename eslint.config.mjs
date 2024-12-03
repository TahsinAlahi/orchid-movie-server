import globals, { browser, commonjs, node } from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    env: { node: true, commonjs: true },
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
