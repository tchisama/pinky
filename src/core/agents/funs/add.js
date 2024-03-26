import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";

export const add = async () => {
  const git = simpleGit();

  const addedFiles = await listTrackedFiles();

  return new Promise(async (resolve, reject) => {
    try {
      const files = await getStatusFiles();
      const selectedFiles = await p.group({
        files: () =>
          p.multiselect({
            message: "Select files",
            initialValues: addedFiles,
            options: files.map((file) => {
              return {
                value: file,
                label: file,
              };
            }),
          }),
      });
      git.add(selectedFiles.files);

      resolve(selectedFiles.files);
    } catch (error) {
      reject(error);
    }
  });
};

export async function listTrackedFiles() {
  const git = simpleGit();
  try {
    const diffSummary = await git.diff(["--cached", "--name-only"]);
    return diffSummary.split("\n").filter((f) => f != "");
  } catch (error) {
    console.error("Error listing staged files:", error);
    return [];
  }
}
