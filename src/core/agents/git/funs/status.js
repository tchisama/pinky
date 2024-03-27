import simpleGit from "simple-git";
import color from "picocolors";
import { listTrackedFiles } from "./add.js";

export async function getStatus() {
  const git = simpleGit();
  const statusSummary = await git.status();
  const table = [];

  const addedFiles = await listTrackedFiles();

  if (addedFiles.length > 0)
    table.push({
      name: "\uf1c0 ) Cached files",
      files: "|  " + addedFiles.map((file) => color.green(file)).join("\n|  "),
    });

  if (statusSummary.not_added.length > 0)
    table.push({
      name: "\ue676 ) New files",
      files:
        "|  " +
        statusSummary.not_added.map((file) => color.blue(file)).join("\n|  "),
    });
  if (statusSummary.modified.length > 0)
    table.push({
      name: "\uea73 ) Modified",
      files:
        "|  " +
        statusSummary.modified.map((file) => color.blue(file)).join("\n|  "),
    });
  if (statusSummary.deleted.length > 0)
    table.push({
      name: "\uea76 ) Deleted",
      files:
        "|  " +
        statusSummary.deleted.map((file) => color.red(file)).join("\n|  "),
    });

  console.log(statusSummary);
  if (table.length === 0) return " no changes ";
  return table.map((group) => `\n${group.name}\n${group.files} \n`).join("");
}

export async function getStatusFiles() {
  const git = simpleGit();
  const statusSummary = await git.status();
  return [
    ...statusSummary.not_added,
    ...statusSummary.modified,
    ...statusSummary.deleted,
  ];
}
