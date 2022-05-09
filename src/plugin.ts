export function remarkCodeRunnerPlugin() {
  return (tree) => {
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

    return tree =>{
            const nodesToChange = [];
            visit(tree, "code", node => {
                nodesToChange.push({
                    node
                });
            });
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
    })
  }
}
