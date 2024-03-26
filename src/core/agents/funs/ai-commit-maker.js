import { generate } from "../../../ai/funs/openaifun.js";
import simpleGit from "simple-git";

export const aiCommitMaker = async () => {
  const git = simpleGit();
  const diff = await git.diff();

  const response = await generate({
    messages: [
      {
        role: "system",
        content:
          "Your task is to craft concise and descriptive commit messages based on the provided code diff, ensuring each message contains between 10 to 30 words. If there are numerous changes, please group the files logically and create multiple commits to effectively capture the essence of each set of changes.",
      },
      {
        role: "user",
        content: diff.slice(0,2000),
      },
    ],
  });

  return response;
};
