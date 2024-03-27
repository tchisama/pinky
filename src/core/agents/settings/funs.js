import * as p from "@clack/prompts";
import fs from "fs/promises";
import { settingsAgent } from "./settings.js";

export async function funs(option) {
  const name = await p.group({
    value: () =>
      p.text({
        message: option,
        validate: (value) => {
          if (!value) return "can't be empty";
        },
      }),
  });
  if (name.value) {
    await updateField({ name: option, value: name.value });
  }
  settingsAgent();
}

const filePath = "/home/tchisama/pinky/data.json";
const updateField = async ({ name, value }) => {
  try {
    // Read the file
    let data = await fs.readFile(filePath, "utf8");

    // Update the content (e.g., append text)
    const jsonData = JSON.parse(data);
    jsonData[name] = value;
    const stringData = JSON.stringify(jsonData);

    // Write the updated content back to the file
    await fs.writeFile(filePath, stringData);

    console.log("File updated successfully.");
  } catch (err) {
    console.error("Error:", err);
  }
};

export const getData = async () => {
  try {
    // Read the file
    let data = await fs.readFile(filePath, "utf8");

    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};
