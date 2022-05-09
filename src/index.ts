import remark from 'remark'
import fs from 'fs';

function run() {
  const file = fs.readFileStream('filename')
  const ast = remark.get('filepath');
  for (let i = 0; i < ast.root.length; ++i) {
    const node = ast.root[i];
    if (node?.type === 'CodeBlock') {
      const followingNode = ast.root[i+1];
      const hasFollowingCodeOutput = followingNode?.type === 'CodeBlock' && followingNode.attr === 'output'
      if (hasFollowingCodeOutput) {
        // todo
      }
    }
  }
  // write ast back to file
}
