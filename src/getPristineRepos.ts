import fetch from "node-fetch";

const blackList = [
  "pristine-bot",
  "pristine-cli",
];

export interface IPristineRepo {
  name: string;
  shortName: string;
}

const getPristineRepos = (): Promise<IPristineRepo[]> => {
  return fetch("https://api.github.com/users/etclabscore/repos?per_page=100").then((res) => {
    return res.json();
  }).then((results) => {
    return results.filter((repo: any) => {
      const includesBlackList = blackList.find((b) => repo.full_name.includes(b));
      return repo.full_name.includes("pristine") && !includesBlackList;
    }).map((f: any) => ({
      name: f.full_name,
      shortName: f.full_name.split("etclabscore/")[1],
    }));
  });
};

export default getPristineRepos;
