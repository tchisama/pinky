import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { gitAgent } from "./agents/git/git.js";
import { settingsAgent } from "./agents/settings/settings.js";
import { githubTimeLine } from "./extentions/github-time-line.js";
import { codeGenerator } from "./agents/codeGenerator/codeGenerator.js";

export async function start() {
  console.clear();
  p.intro(`${color.bgCyan(color.black(" Pinky "))} `);

  await githubTimeLine();

  const agentSelect = await p.group(
    {
      agent: ({ results }) =>
        p.select({
          message: `Pick an agent`,
          initialValue: "git",
          maxItems: 10,
          options: [
            { value: "git", label: "\ue702  Git Manager" },
            { value: "code", label: "\ueac4  Code Genirator" },
            { value: "fs", label: "\ue5ff  File Manager" },
            { value: "system", label: "\ue73a  System Helper \n" },
            { value: "settings", label: "\ueb51  Settings " },
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
  p.spinner("Loading..."); 
  if (agentSelect.agent == "git") {
    gitAgent();
  }
  if (agentSelect.agent == "settings") {
    settingsAgent();
  }
  if (agentSelect.agent == "code") {
    codeGenerator();
  }
}
