import { spawn, SpawnOptions } from "child_process";

import { v4 as uuidv4 } from "uuid";

export function getShellRunner(lang: keyof typeof langConfig) {
  const config = langConfig[lang];
  const { child } = shell(config.cmd);

  const runCmd = async (cmd: string): Promise<string> => {
    child.stdin!.setDefaultEncoding("utf-8");
    const knownText = uuidv4();
    const knownCommand = config.knownCommand(knownText);

    const promise = new Promise<string>((resolve) => {
      const buffer: string[] = [];
      // So the for await stdout syntax throws an error, have to use the `on` method
      const listener = (data: Buffer) => {
        const str = data.toString();
        if (str.includes(knownText)) {
          buffer.push(str.replace(`${knownText}\n`, ""));
          stream.removeListener("data", listener);

          resolve(
            buffer
              // .map((text) => ("strip" in config ? config.strip(text) : text))
              .join("")
              .trim(),
          );
        } else {
          buffer.push(str);
          // buffer.push("strip" in config ? config.strip(str) : str);
        }
      };
      const stream = child.stdout!.on("data", listener);
    });

    child.stdin!.cork();
    // console.log("writeable", child.stdin!.writable);
    child.stdin!.write(`${cmd}\n`);
    child.stdin!.write(`${knownCommand}\n`);
    child.stdin!.uncork();
    // child.stdin!.end();

    return promise;
  };
  const dispose = () => {
    child.stdin!.destroy();
  };
  return {
    runCmd,
    dispose,
  };
}
export const langConfig = {
  js: {
    // TODO: What should this look like?
    cmd: "yarn --silent start:node-repl 2>&1",
    knownCommand: (text: string) => `console.log('${text}')`,
    strip: (text: string) => {
      if (text.includes("Welcome to Node.js")) {
        return "";
      } else if (text.startsWith("> ")) {
        return text.slice(2);
      } else if (text.endsWith(">")) {
        return text.slice(0, -1);
      }
      return text;
    },
  },
  zsh: {
    cmd: "zsh 2>&1",
    knownCommand: (text: string) => `echo ${text}`,
  },
};

export function shell(cmd: string, options?: SpawnOptions) {
  const child = spawn(cmd, {
    shell: true,
    ...options,
  });

  return {
    child,
  };
}
