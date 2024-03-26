import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./funs/status.js";
import { checkGit } from "./funs/checkGit.js";
import { start } from "../start.js";
import { add } from "./funs/add.js";
import { commit } from "./funs/commit.js";

export const gitAgent = async (runBefore) => {
  console.clear();
  // check if the repo exist
  const repoExist = await checkGit();
  if (!repoExist) return console.log("please git init here first");
  // check if there is any files in the stage
  // const stage = await getStatusFiles()
  // if(!stage.length == 0 ) return

  p.intro(`${color.bgCyan(color.black(" Pinky | \ue702 Git Manage "))}`);
  if (runBefore) runBefore();
  const git = await p.group(
    {
      tools: ({ results }) =>
        p.select({
          message: `Core git actions`,
          initialValue: "git",
          maxItems: 10,
          options: [
            {
              value: "back",
              label: " \uea9b  back \n",
            },
            {
              value: "status",
              label: " \ueaf0  Status",
              hint: "Check status",
            },
            { value: "add", label: " \uf4d0  Add", hint: "Stage changes" },
            {
              value: "commit",
              label: " \uf4b6  Commit",
              hint: "Record changes",
            },
            {
              value: "push",
              label: " \ueaf4  Push",
              hint: "Send to remote",
            },
            {
              value: "pull",
              label: " \uf4b6  Pull",
              hint: "Fetch & merge ",
            },
          ],
        }),
    },
    {
      onCancel: () => {
        start();
      },
    },
  );

  if (git.tools == "status") {
    const status = await getStatus();
    gitAgent(() => p.note(status));
  }

  if (git.tools == "back") {
    start();
  }

  if (git.tools == "commit") {
    const commiting = await commit();
    gitAgent();
  }

  if (git.tools == "add") {
    await add();
    gitAgent();
  }
};
