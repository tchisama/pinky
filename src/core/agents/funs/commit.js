import * as p from "@clack/prompts";
import color from "picocolors";
import { getStatus, getStatusFiles } from "./status.js";
import simpleGit from "simple-git";

export const commit = async () => {
  const git = simpleGit();
  return new Promise(async (resolve, reject) => {
    try {
      const selectedFiles = await p.group({
        files: () =>
          p.select({
            message: "Select files",
            initialValues: [],
            options: [
              { value: "type", label: "\uea73 | Type commit" },
              { value: "generate", label: "\ue370 | Ai generate" },
            ],
          }),
      });
      resolve(selectedFiles.files);
    } catch (error) {
      reject(error);
    }
  });
};
