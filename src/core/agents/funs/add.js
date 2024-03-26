import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";

export const add = async () => {
  const git = simpleGit();
  return new Promise(async (resolve, reject) => {
    try {
      const files = await getStatusFiles();
      const selectedFiles = await p.group({
        files: () =>
          p.multiselect({
            message: "Select files",
            initialValues: [],
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
