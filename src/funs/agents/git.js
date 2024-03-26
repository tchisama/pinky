import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

export const gitAgent = async () => {
  await p.group(
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
  gitAgent();
};
