import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";

export async function hasUnpushedCommits(branchName) {
  const git = simpleGit();
  try {
    // Fetch the latest changes from the remote repository
    await git.fetch("origin", branchName);

    // Get the commit hashes of the local and remote branches
    const localCommits = await git.log({
      from: `origin/${branchName}`,
      to: branchName,
    });
    const remoteCommits = await git.log(`origin/${branchName}`);

    // Check if there are commits in the local branch that are not in the remote branch
    const unpushedCommitsExist = localCommits.all.some(
      (localCommit) =>
        !remoteCommits.all.some(
          (remoteCommit) => remoteCommit.hash === localCommit.hash,
        ),
    );

    return unpushedCommitsExist;
  } catch (error) {
    return false;
  }
}

export async function push(branchName) {
  const git = simpleGit();
  try {
    await git.push("origin", branchName);
  } catch (error) {}
}
