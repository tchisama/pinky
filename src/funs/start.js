import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import {gitAgent} from "./agents/git.js"

export async function start() {
  console.clear();

  await setTimeout(1000);

  p.intro(`${color.bgCyan(color.black(" Pinky "))}`);

  const agentSelect = await p.group(
    {
      agent: ({ results }) =>
        p.select({
          message: `Pick an agent`,
          initialValue: "git",
          maxItems: 10,
          options: [
            { value: "git", label: " 🐙 Git Manager" },
            { value: "code", label: " 📝 Code Genirator" },
            { value: "fs", label: " 📂 File Manager" },
            { value: "system", label: " 🐧 System Helper" },
          ],
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );

  if (agentSelect.agent == "git") {
    gitAgent()
  }
}
