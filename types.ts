export type Token =
  | "open_parenthesis"
  | "closed_parenthesis"
  | "number"
  | "string"
  | "comma"
  | "name"
  | "whitespace";

export type TokenList = { type: Token; value: string }[];

export type AST = {
  type: "function";
  name: string;
  children?: AST[];
} | {
  type: "number";
  value: number;
} | {
  type: "string";
  value: string;
} | {
  type: "variable";
  value: string;
} | {
  type: "void";
};
