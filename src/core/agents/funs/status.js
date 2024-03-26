import simpleGit from "simple-git";

export async function getStatus() {
  const git = simpleGit();
  const statusSummary = await git.status();
  return statusSummary;
}
