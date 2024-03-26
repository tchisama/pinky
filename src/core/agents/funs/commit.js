import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";
import { aiCommitMaker } from "./ai-commit-maker.js";

export const commit = async () => {
  const git = simpleGit();
  return new Promise(async (resolve, reject) => {
    try {
      const commitMethod = await p.group({
        method: () =>
          p.select({
            message: "Select files",
            initialValues: [],
            options: [
              { value: "type", label: "\uea73 | Type commit" },
              { value: "generate", label: "\ue370 | Ai generate" },
            ],
          }),
      });
      if (commitMethod.method == "type") {
        const message = await p.group({
          message: () =>
            p.text({
              message: "Enter a commit",
              validate: (value) => {
                if (!value) return "commit cant be empty";
              },
            }),
        });
        git.commit(message.message);
        resolve(message.message);
      } else {
        const aicommit = await aiCommitMaker();
        const addall = await git.add("*");
        git.commit(aicommit);
        resolve(aicommit);
      }
    } catch (error) {
      reject(error);
    }
  });
};
