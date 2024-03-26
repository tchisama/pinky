import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { getStatus } from "./funs/status.js";

export const gitAgent = async () => {
  const git = await p.group(
    {
      tools: ({ results }) =>
        p.select({
          message: `Core git actions`,
          initialValue: "git",
          maxItems: 10,
          options: [
            { value: "status", label: " 🟢 Status - Check repository status" },
            { value: "add", label: " ➕ Add - Stage changes" },
            { value: "commits", label: " 📝 Commit - Record changes" },
            { value: "push", label: " 🚀 Push - Send commits to remote" },
            { value: "pull", label: " 🔄 Fetch and merge changes" },
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
    p.note(
      status.modified
        .map((file) => color.blue(file))
        .join("\n"),
    );
  }

  gitAgent();
};
