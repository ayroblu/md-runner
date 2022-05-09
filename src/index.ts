// import { remark } from "remark";
import fs from "fs";
import { unified } from "unified";
import parser from "remark-parse";
import stringify from "remark-stringify";
import { remarkCodeRunnerPlugin } from "./plugin";

function run() {
  const file = fs.readFileSync("filename");
  const ast = remark.get("filepath");
  for (let i = 0; i < ast.root.length; ++i) {
    const node = ast.root[i];
    if (node?.type === "CodeBlock") {
      const followingNode = ast.root[i + 1];
      const hasFollowingCodeOutput =
        followingNode?.type === "CodeBlock" && followingNode.attr === "output";
      if (hasFollowingCodeOutput) {
        // todo
      }
    }
  }
  // write ast back to file
}

function updateMarkdown(markdownInput: string) {
  unified()
    .use(parser)
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
