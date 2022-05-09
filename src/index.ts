import fs from "fs";

import rehypePrism from "@mapbox/rehype-prism";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
// import rehypeShiki from "rehype-shiki";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import remarkToc from "remark-toc";
import { unified } from "unified";

import { rehypeInjectCss } from "./rehype-css-plugin.js";
import { remarkCodeRunnerPlugin } from "./remark-code-runner-plugin.js";

const argv = process.argv.slice(2);
if (argv.length !== 1) {
  console.log("Expecting one argument like: code-runner [filename]");
  process.exit(1);
}
const filename = argv[0]!;

async function run() {
  const file = fs.readFileSync(filename);
  updateMarkdown(file.toString()).then(console.log);
  const { value } = await runAndConvertToHtml(file.toString());
  fs.writeFileSync(filename.replace(/\.[^.]*?$/, ".html"), value, {
    encoding: "utf-8",
  });
  // write ast back to file
}
run().catch(console.error);

async function updateMarkdown(markdownInput: string) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCodeRunnerPlugin)
    .use(remarkToc)
    .use(remarkStringify)
    .process(markdownInput)
    .then((file) => file.value);
}

function runAndConvertToHtml(markdownInput: string) {
  return (
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkCodeRunnerPlugin)
      .use(remarkToc)
      .use(remarkRehype)
      .use(rehypeDocument, { title: filename })
      .use(rehypeInjectCss, { cssPaths: ["theme.css"] })
      // useful: https://github.com/wooorm/refractor#syntaxes
      .use(rehypePrism, { ignoreMissing: false, alias: { shell: "zsh" } })
      // .use(rehypeShiki)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(markdownInput)
  );
}
