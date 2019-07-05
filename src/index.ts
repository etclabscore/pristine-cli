import getPristineRepos, { IPristineRepo } from "./getPristineRepos";
import inquirer from "inquirer";
import _ from "lodash";
const ghdownload = require("github-download"); //tslint:disable-line
const inquirerAutoCompletePrompt = require("inquirer-autocomplete-prompt"); //tslint:disable-line

const dirName = process.argv[2];
if (!dirName) {
  console.log("🚨  Error: No Directory Specified. \n\nUsage:\n\n$ pristine-cli myNewDirectory\n"); //tslint:disable-line
  process.exit(1);
}

inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);

getPristineRepos().then((results) => {
  inquirer
    .prompt([
      {
        type: "autocomplete",
        name: "template",
        message: "which pristine template do you want to start from?",
        source: (__: any, input: string) => {
          if (input === "" || input === undefined) {
            return Promise.resolve(results.map((m) => m.shortName));
          }
          return Promise.resolve(results.filter((r) => {
            return r.shortName.includes(input);
          }).map((m) => m.shortName));
        },
      },
    ] as any)
    .then((answers: any): any => {
      ghdownload({
        user: "etclabscore",
        repo: answers.template,
        ref: "master",
      }, dirName)
        .on("err", (e: Error) => {
          console.error(e);
        })
        .on("end", () => {
          console.log(`💎  Finished generating ${answers.template} into ${dirName}. 💎`); //tslint:disable-line
        });
    });
});
