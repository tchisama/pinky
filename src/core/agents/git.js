import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./funs/status.js";

export const gitAgent = async () => {
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
              label: " 🟢 Status",
              hint: "Check repository status",
            },
            { value: "add", label: " ➕ Add", hint: "Stage changes" },
            { value: "commits", label: " 📝 Commit", hint: "Record changes" },
            {
              value: "push",
              label: " 🚀 Push",
              hint: "Send commits to remote",
            },
            {
              value: "pull",
              label: " 🔄 Pull",
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
    console.log(files)
    p.group({
      files: () =>
        p.multiselect({
          message: "Select files to add them to stage",
          initialValues: [],
          options: [...files],
        }),
    });
  }
};
