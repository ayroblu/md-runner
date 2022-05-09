import { Plugin } from "unified";
import { visit } from "unist-util-visit";

type RemarkCodeRunnerOptions = {};

export const remarkCodeRunnerPlugin: Plugin<[RemarkCodeRunnerOptions?]> =
  () => (tree) => {
    // if (
    //   node.type === 'textDirective' ||
    //   node.type === 'leafDirective' ||
    //   node.type === 'containerDirective'
    // ) {
    //   const data = node.data || (node.data = {})
    //   const hast = h(node.name, node.attributes)

    //   data.hName = hast.tagName
    //   data.hProperties = hast.properties
    // }

    const nodesToChange = [];
    visit(tree, "code", (node) => {
      nodesToChange.push({
        node,
      });
    });
    // const ast = remark.get("filepath");
    // for (let i = 0; i < ast.root.length; ++i) {
    //   const node = ast.root[i];
    //   if (node?.type === "CodeBlock") {
    //     const followingNode = ast.root[i + 1];
    //     const hasFollowingCodeOutput =
    //       followingNode?.type === "CodeBlock" && followingNode.attr === "output";
    //     if (hasFollowingCodeOutput) {
    //       // todo
    //     }
    //   }
    // }
    // for (const { node } of nodesToChange) {
    //     try {
    //         const url = await getCodeScreenshot(node.value);
    //         node.type = "image";
    //         node.url = url;
    //     } catch (e) {
    //         console.log("ERROR", e);
    //         return reject(e);
    //     }
    // }
  };
