import fs from "fs";

import rehypePrism from "@mapbox/rehype-prism";
import { Command } from "commander";
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

import { version } from "../package.json";

import { rehypeInjectCss } from "./rehype-css-plugin.js";
import { remarkCodeRunnerPlugin } from "./remark-code-runner-plugin.js";

const program = new Command();

program
  .name("code-runner")
  .description("Runs the code in your markdown and outputs markdown or html")
  .version(version);

program
  .command("md")
  .description("Update markdown")
  .argument("<string>", "filename")
  .option("-w, --write", "write to file in place")
  .action((filename: string, { write }: { write?: boolean }) => {
    const file = fs.readFileSync(filename).toString();
    updateMarkdown(file)
      .then(({ value }) => {
        if (write) {
          fs.writeFileSync(filename, value, { encoding: "utf-8" });
        }
      })
      .catch(console.error);
  });

program
  .command("html")
  .description("Create html")
  .argument("<string>", "filename")
  .option("-o, --output [outfile]", "file to output to")
  .action((filename: string, { output }: { output?: string }) => {
    const file = fs.readFileSync(filename).toString();
    runAndConvertToHtml(file, filename)
      .then(({ value }) => {
        if (output) {
          fs.writeFileSync(value, value, { encoding: "utf-8" });
        } else {
          console.log(value);
        }
      })
      .catch(console.error);
  });

program.parse();

async function updateMarkdown(markdownInput: string) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCodeRunnerPlugin)
    .use(remarkToc)
    .use(remarkStringify)
    .process(markdownInput);
}

function runAndConvertToHtml(markdownInput: string, filename: string) {
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
