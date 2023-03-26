import type { Token, TokenList } from "./types.ts";

const tokens: [Token, RegExp][] = [
  ["open_parenthesis", /^\(/],
  ["closed_parenthesis", /^\)/],
  ["number", /^\d+/],
  ["string", /^\'.+\'/],
  ["comma", /^,/],
  ["whitespace", /^\s+/],
  ["name", /^[a-z]+/],
];

/**
 * Given input text, will split into a list of tokens contained inside
 */
export function tokenizer(input: string) {
  let index = 0;
  const result_tokens: TokenList = [];

  while (input.length > 0) {
    let matched = false;
    for (const token of tokens) {
      const match = input.match(token[1]);

      if (match) {
        const result = match[0];

        input = input.slice(result.length);
        index += result.length;

        result_tokens.push({ type: token[0], value: result });
        matched = true;
        break;
      }
    }
    if (!matched) throw `Unrecognized token at index ${index}`;
  }

  return result_tokens;
}
