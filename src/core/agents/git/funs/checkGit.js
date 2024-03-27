import simpleGit from "simple-git";

export async function checkGit() {
    const git=simpleGit()
  try {
    const isRepo = await git.checkIsRepo();
    return isRepo;
  } catch (error) {
    console.error(error);
    return false;
  }
}
