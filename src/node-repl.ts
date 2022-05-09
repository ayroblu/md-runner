import repl from "repl";

function startRepl(
  input: NodeJS.ReadableStream,
  output: NodeJS.WritableStream,
) {
  const writer = () => "";
  repl.start({ input, output, prompt: "", writer });
}
startRepl(process.stdin, process.stdout);
