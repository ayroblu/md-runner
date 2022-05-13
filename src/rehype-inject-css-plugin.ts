import { Root, Element } from "hast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

type RehypeInjectCssOptions = { cssBlocks: string[] };

export const rehypeInjectCss: Plugin<[RehypeInjectCssOptions], Root> =
  ({ cssBlocks }) =>
  (tree) => {
    visit<Root, Element["type"]>(tree, "element", (node) => {
      if (node.tagName === "head") {
        cssBlocks.forEach((css) => {
          const style: Element = {
            type: "element",
            tagName: "style",
            children: [
              {
                type: "text",
                value: css,
              },
            ],
          };
          node.children.push(style);
        });
      }
    });
  };
