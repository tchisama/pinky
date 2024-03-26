import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";

async function listLocalBranches() {
  const git = simpleGit();
  try {
    const branchSummary = await git.branchLocal();
    const localBranches = branchSummary.all.filter(
      (branch) => !branch.startsWith("remotes/origin/"),
    );
    return localBranches;
  } catch (error) {
    console.error("Error listing local branches:", error);
    return [];
  }
}

export const branch = async () => {
  const git = simpleGit();
  const branchs = await listLocalBranches();

  return new Promise(async (resolve, reject) => {
    try {
      const files = await getStatusFiles();
      const selectedBranch = await p.group({
        branch: () =>
          p.select({
            message: "Select files",
            initialValues: [],
            options: branchs.map((b) => {
              return {
                value: b,
                label: b,
              };
            }),
          }),
      });
      git.checkout(selectedBranch.branch);

      resolve(selectedFiles.files);
    } catch (error) {
      reject(error);
    }
  });
};
