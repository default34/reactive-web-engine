import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: "cjs",
        file: packageJson.main,
        sourcemap: true,
      },
      {
        format: "esm",
        file: packageJson.module,
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      babel({ exclude: ["node_modules/**"] }),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts.default()],
  },
];
