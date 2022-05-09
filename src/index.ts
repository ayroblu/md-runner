// import { remark } from "remark";
import fs from "fs";

import stringify from "remark-stringify";
import { unified } from "unified";

import { remarkCodeRunnerPlugin } from "./plugin.ts";

const argv = process.argv.slice(2);
if (argv.length !== 1) {
  console.log("Expecting one argument like: code-runner [filename]");
  process.exit(1);
}
const filename = argv[0]!;

function run() {
  const file = fs.readFileSync(filename);
  updateMarkdown(file.toString());
  // write ast back to file
}
run();

function updateMarkdown(markdownInput: string) {
  unified()
    .use(stringify)
    .use(remarkCodeRunnerPlugin)
    .process(markdownInput)
    .then((file) => {
      console.log(file);
      /* file.data.codeblocks = [ ... ] */
    });
}

function runAndConvertToHtml(markdownInput: string) {
  return unified()
    .use(parser)
    .use(stringify)
    .use(remarkCodeRunnerPlugin)
    .process(markdownInput)
    .then((file) => {
      console.log(file);
      /* file.data.codeblocks = [ ... ] */
    });
}
