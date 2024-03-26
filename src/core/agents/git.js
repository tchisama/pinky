import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./funs/status.js";
import { checkGit } from "./funs/checkGit.js";

export const gitAgent = async () => {
  const repoExist = await checkGit();
  if (!repoExist) return console.log("please git init here first");
  const git = await p.group(
    {
      tools: ({ results }) =>
        p.select({
          message: `Core git actions`,
          initialValue: "git",
          maxItems: 10,
          options: [
            {
              value: "status",
              label: " \ueaf0 Status",
              hint: "Check repository status",
            },
            { value: "add", label: " \uf4d0 Add", hint: "Stage changes" },
            {
              value: "commits",
              label: " \uf4b6 Commit",
              hint: "Record changes",
            },
            {
              value: "push",
              label: " \ueaf4 Push",
              hint: "Send commits to remote",
            },
            {
              value: "pull",
              label: " \uf4b6 Pull",
              hint: "Fetch and merge changes",
            },
          ],
        }),
    },
    {
      onCancel: () => {
        p.cancel("Git Agent cancelled.");
        process.exit(0);
      },
    },
  );

  if (git.tools == "status") {
    const status = await getStatus();
    p.note(status);
    gitAgent();
  }

  if (git.tools == "add") {
    const files = await getStatusFiles();
    const selectedFiles = await p.group({
      files: () =>
        p.multiselect({
          message: "Select all files to add them to stage",
          initialValues: [],
          options: files.map((file) => {
            return {
              value: file,
              label: file,
            };
          }),
        }),
    });
    gitAgent();
  }
};
