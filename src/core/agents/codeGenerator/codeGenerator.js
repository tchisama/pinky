import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import { exec } from "child_process";
import { generate } from "../../../ai/funs/openaifun.js";
import { messages } from "./messages.js";
import fs from "fs";

export const codeGenerator = async () => {
  console.clear();
  exec(
    "grep -r -n 'CREATE' --exclude-dir=node_modules --exclude-dir=.git  ./ ",
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        return;
      }
      const lines = stdout.trim().split("\n");

      const grep = lines.map((line) => {
        const position = line.trim();
        const splited = position.split(":");
        const path = splited[0];
        const lineNumber = splited[1];
        const prompt = splited[2];
        const id = Math.random();
        // console.log(`path:${path}`);
        // console.log(`line number:${lineNumber}`);
        // console.log(`prompt:${prompt}`);
        return { path, lineNumber, prompt, id };
      });

      const file = await p.group(
        {
          selected: ({ results }) =>
            p.select({
              message: `Pick an agent`,
              options: [
                ...grep.map((f) => ({
                  value: f.prompt,
                  label: f.prompt.slice(2),
                })),
              ],
            }),
        },
        {
          onCancel: () => {
            p.cancel("Operation cancelled.");
            process.exit(0);
          },
        },
      );
      const selectedFile = grep.find((f) => f.prompt === file.selected);
      try {
        const fileContent = fs.readFileSync(selectedFile.path, "utf8");

        const generatedCode = await generate({
          messages: [
            ...messages,
            {
              role: "user",
              content: fileContent,
            },
          ],
        });

        // Update the content
        const updatedContent = fileContent.replace(
          selectedFile.prompt,
          generatedCode,
        );

        // Write the updated content back to the file synchronously
        fs.writeFileSync(selectedFile.path, updatedContent, "utf8");
      } catch (err) {
        console.error("Error reading or updating the file:", err);
      }
    },
  );
};
