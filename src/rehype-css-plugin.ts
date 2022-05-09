import fs from "fs";

import { Root, Element } from "hast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

type RehypeInjectCssOptions = { cssPaths: string[] };

export const rehypeInjectCss: Plugin<[RehypeInjectCssOptions], Root> =
  ({ cssPaths }) =>
  (tree) => {
    visit<Element>(tree, "element", (node) => {
      if (node.tagName === "head") {
        cssPaths.forEach((path) => {
          const style: Element = {
            type: "element",
            tagName: "style",
            children: [
              {
                type: "text",
                value: fs.readFileSync(path).toString(),
              },
            ],
          };
          node.children.push(style);
        });
      }
    });
  };
