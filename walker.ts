// deno-lint-ignore-file no-explicit-any
import { AST } from "./types.ts";

const variable_table: Record<string, string | number> = {};

const function_table: Record<string, (...x: any[]) => any> = {
  add: (...x) => x.reduce((prev, cur) => prev + cur, 0),
  print: (...x) => console.log(...x),
  set: (name: string, value: string | number) => variable_table[name] = value,
};

export function walker(ast: AST[]) {
  for (let i = 0; i < ast.length; i++) {
    const command = ast[i];

    switch (command.type) {
      case "variable": {
        const value = variable_table[command.value];
        if (value === undefined) {
          throw `Use of undeclared variable ${command.value}`;
        }

        if (typeof value === "string") {
          ast[i] = {
            type: "string",
            value,
          };
        } else if (typeof value === "number") {
          ast[i] = {
            type: "number",
            value,
          };
        } else {
          throw `Somehow ended up with a variable of no valid type... hOW?`;
        }
        break;
      }
      case "function": {
        if (!function_table[command.name]) {
          throw `Attempting to call undeclared function ${command.name}`;
        }

        let value: any;

        if (!command.children) {
          value = function_table[command.name]();
        } else {
          walker(command.children);
          const children = command.children.map((val) => {
            if (val.type === "string") {
              return val.value;
            } else if (val.type === "number") {
              return val.value;
            } else {
              throw `Unresolved type entering method`;
            }
          });
          value = function_table[command.name](...children);
        }

        if (typeof value === "number") {
          ast[i] = {
            type: "number",
            value,
          };
        } else if (typeof value === "string") {
          ast[i] = {
            type: "string",
            value,
          };
        } else if (typeof value === "undefined") {
          ast[i] = {
            type: "void",
          };
        }
      }
    }
  }
}
