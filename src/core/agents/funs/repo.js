
import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";



export async function getRepositoryName(folderPath) {
  const git = simpleGit(folderPath);
  try {
    const topLevelDir = await git.revparse(['--show-toplevel']);
    const repoName = topLevelDir.split('/').pop(); // Extract the repository name from the path
    return repoName;
  } catch (error) {
    console.error('Error getting repository name:', error);
    return null;
  }
}
export async function getCurrentBranch(folderPath) {
  const git = simpleGit(folderPath);
  try {
    const branchName = await git.revparse(['--abbrev-ref', 'HEAD']);
    return branchName.trim();
  } catch (error) {
    console.error('Error getting current branch:', error);
    return null;
  }
}

