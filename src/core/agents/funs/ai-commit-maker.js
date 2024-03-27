import { generate } from "../../../ai/funs/openaifun.js";
import simpleGit from "simple-git";

export const aiCommitMaker = async () => {
  const git = simpleGit();
  const diff = await git.diff();
  if (!diff) return console.log("nothing to commit to");
  const response = await generate({
    messages: [
      {
        role: "system",
        content:
          "Craft concise and descriptive commit messages based on the main core functionality of the code. Ignore small changes or non-impactful elements and focus on capturing the essence of significant modifications that affect the code's core functionality. Each commit message should contain between 10 to 40 words.",
      },
      {
        role: "user",
        content: diff.slice(0, 2000),
      },
    ],
  });

  return response;
};
