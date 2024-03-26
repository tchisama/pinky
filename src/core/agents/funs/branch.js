import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";
import { getRepositoryName, getCurrentBranch } from "./repo.js";

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
  const currentBranch = await getCurrentBranch();

  return new Promise(async (resolve, reject) => {
    try {
      const files = await getStatusFiles();
      const selectedBranch = await p.group({
        branch: () =>
          p.select({
            message: "Select files",
            initialValues: [],
            options: [...branchs, " \uf067 | craet branch "].map((b) => {
              return {
                value: b,
                label: b==currentBranch ? color.blue(b + " *"):b,
              };
            }),
          }),
      });
      if (selectedBranch.branch !== " \uf067 | craet branch ") {
        await git.checkout(selectedBranch.branch);
      } else {
        const newBranch = await p.group({
          name: () =>
            p.text({
              message: "branch name",
              validate: (value) => {
                if (!value) return "cant be empy!";
              },
            }),
        });
        await git.checkoutBranch(newBranch.name, currentBranch);
      }

      resolve(selectedBranch.branch);
    } catch (error) {
      reject(error);
    }
  });
};
