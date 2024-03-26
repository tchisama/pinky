import simpleGit from "simple-git";
import color from "picocolors";

export async function getStatus() {
  const git = simpleGit();
  const statusSummary = await git.status();
  const table = [];

  if (statusSummary.not_added.length > 0)
    table.push({
      name: "\ue676 ) New files",
      files:
        "|  " +
        statusSummary.not_added.map((file) => color.green(file)).join("\n|  "),
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
