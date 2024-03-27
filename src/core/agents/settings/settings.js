import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { start } from "../../start.js";
import { funs, getData } from "./funs.js";

export const settingsAgent = async (runBefore) => {
  console.clear();
  const data = await getData();

  let options = [
    {
      value: "back",
      label: " \uea9b  Back \n",
    },
    {
      value: "Github-user-name",
      label:
        " \uea84  Github username (" +
        color.green(data["Github-user-name"]) +
        ")",
    },
    {
      value: "github-access-token",
      label:
        " \ueb11  Github access token (" +
        color.green(
          (data["github-access-token"] ?? " ").slice(0, 6) + "******",
        ) +
        ")",
    },
    {
      value: "openai-key",
      label:
        " \ueb11  Openai key (" +
        color.green((data["openai-key"] ?? " ").slice(0, 6) + "******") +
        ")",
    },
  ];

  p.intro(" Settings ");
  if (runBefore) runBefore();
  const settings = await p.group(
    {
      option: ({ results }) =>
        p.select({
          message: `setting`,
          initialValue: "git",
          maxItems: 10,
          options,
        }),
    },
    {
      onCancel: () => {
        start();
      },
    },
  );
  if (settings.option === "back") {
    start();
  }else{
    funs(settings.option);
  }
};
