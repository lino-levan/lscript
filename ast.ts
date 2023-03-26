import type { AST, TokenList } from "./types.ts";

/**
 * Generates an AST from a given token list
 */
export function ast(tokens: TokenList) {
  const result_ast: AST[] = [];

  ast_loop:
  while (tokens.length > 0) {
    const token = tokens.shift()!;

    switch (token.type) {
      case "name": {
        result_ast.push({
          type: "variable",
          value: token.value,
        });
        break;
      }
      case "number": {
        result_ast.push({
          type: "number",
          value: parseInt(token.value), // DO BETTER PARSING OF NUMBERS
        });
        break;
      }
      case "string": {
        result_ast.push({
          type: "string",
          value: token.value.slice(1, -1),
        });
        break;
      }
      case "open_parenthesis": {
        const last = result_ast[result_ast.length - 1];
        if (last.type !== "variable") throw `Random open paranthesis`;

        result_ast[result_ast.length - 1] = {
          type: "function",
          name: last.value,
          children: ast(tokens),
        };
        break;
      }
      case "closed_parenthesis": {
        break ast_loop;
      }
    }
  }

  return result_ast;
}
