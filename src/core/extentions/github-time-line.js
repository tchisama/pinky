import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import simpleGit from "simple-git";

//TODO: hello world

const git = simpleGit();

// Function to get commits and format them into a GitHub-like timeline
export const githubTimeLine = async () => {
  try {
    const commits = await git.log();

    // Format commits into a timeline
    const timeline = commits.all
      .map((commit) => {
        const date = new Date(commit.date);
        return {
          date: date.toISOString().split("T")[0],
          message: commit.message,
        };
      })
      .reduce((timeline, commit) => {
        const index = timeline.findIndex((entry) => entry.date === commit.date);
        if (index !== -1) {
          timeline[index].commits.push(commit);
        } else {
          timeline.push({ date: commit.date, commits: [commit] });
        }
        return timeline;
      }, []);
    // .join("\n\n");
    const days = getDateRange(timeline[timeline.length - 1].date, new Date());

    // CREATE: a function that return the new date
    // UPDATE: this function so it will return something good

    p.note(
      days
        .map((d) => {
          const s = "\uf0c8 ";
          const findday = timeline.find((dd) => dd.date == d);
          if (!findday) return color.black(s);
          const commitsNumber = findday.commits || 0;
          return commitsNumber.length > 9 ? color.green(s) : color.cyan(s);
        })
        .map((_, i) => ((i + 1) % 14 === 0 ? [_, "\n"] : _))
        .flat(2)
        .join(""),
      // .slice(0, -1)
      `Starts in ${days.length} days`,
    );
  } catch (error) {
    console.error("Error fetching commits:", error);
  }
};

const getDateRange = (startDate, endDate) => {
  const dateRange = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateRange.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};
