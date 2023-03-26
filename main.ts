import { ast } from "./ast.ts";
import { tokenizer } from "./tokenizer.ts";
import { walker } from "./walker.ts";

const file = await Deno.readTextFile(Deno.args[0]);

const tokens = tokenizer(file);
const a = ast(tokens);

walker(a);
