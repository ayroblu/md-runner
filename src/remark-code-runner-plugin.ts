import { Root, Code } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

import { getShellRunner, langConfig } from "./shell-helper.js";

type RemarkCodeRunnerOptions = {};
type CodeToRun = { codeNode: Code; outputNode: Code };

export const remarkCodeRunnerPlugin: Plugin<[RemarkCodeRunnerOptions?], Root> =
  () => async (tree) => {
    // console.log(JSON.stringify(tree, null, 2));
    // return tree;
    const codeToRun: CodeToRun[] = getCodeToRun(tree);
    const { closeAllShellRunners, getShellRunnerByLang } = shellRunnerManager();
    for (const { codeNode, outputNode } of codeToRun) {
      const shellRunner = getShellRunnerByLang(codeNode.lang);
      if (!shellRunner) return;
      const output = await shellRunner.runCmd(codeNode.value);
      outputNode.value = output;
    }
    closeAllShellRunners();

    return tree;
  };

function shellRunnerManager() {
  const shellRunnerMap: {
    [k in keyof typeof langConfig]?: ReturnType<typeof getShellRunner>;
  } = {};
  const getShellRunnerByLang = (lang: string | null | undefined) => {
    if (!lang || !isKey(lang, langConfig)) {
      return null;
    }
    if (shellRunnerMap[lang]) {
      return shellRunnerMap[lang];
    } else {
      return (shellRunnerMap[lang] = getShellRunner(lang));
    }
  };
  const closeAllShellRunners = () => {
    Object.values(shellRunnerMap).forEach(({ dispose }) => {
      dispose();
    });
  };
  return {
    getShellRunnerByLang,
    closeAllShellRunners,
  };
}

const isKey = <T extends { [k: number | string | symbol]: any }>(
  key: number | string | symbol,
  t: T,
): key is keyof T => !!t[key];

function getCodeToRun(tree: Root): CodeToRun[] {
  const codeToRun: CodeToRun[] = [];
  visit<Root, Code["type"]>(tree, "code", (node, index, parent) => {
    if (parent && index !== null && !isOutputCode(node)) {
      const followingNode = parent.children[index + 1];
      const hasFollowingCodeOutput =
        followingNode?.type === "code" && isOutputCode(followingNode);

      if (hasFollowingCodeOutput) {
        codeToRun.push({ codeNode: node, outputNode: followingNode });
      } else {
        const outputNode: Code = {
          type: "code",
          value: "",
          position: node.position,
          lang: "txt",
          meta: "output",
        };
        parent.children.splice(index + 1, 0, outputNode);
        codeToRun.push({ codeNode: node, outputNode: outputNode });
      }
    }
  });

  return codeToRun;
}

function isOutputCode(node: Code): boolean {
  return node.meta?.split(" ").includes("output") ?? false;
}
