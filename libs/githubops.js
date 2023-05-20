import { Octokit } from "@octokit/rest";


export async function createGithubFolder(user) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const userFolder = `users/${user}/.gitkeep`;

  // Check if user folder exists in repo
  octokit.repos.getContent({
    owner: "steveoni",
    repo: "scatteredNote",
    path: userFolder,
  })
    .then(() => {
      // User folder exists
      console.log(`User folder already exists: ${userFolder}`);
    })
    .catch((error) => {
      // User folder does not exist
      if (error.status === 404) {
        octokit.repos.createOrUpdateFileContents({
          owner: "steveoni",
          repo: "scatteredNote",
          path: userFolder,
          message: `Create ${userFolder}/README.md`,
          content: Buffer.from("").toString("base64"),
        })
          .then(() => {
            console.log(`User folder created: ${userFolder}`);
          })
          .catch((error) => {
            console.log(`Error creating user folder: ${userFolder}`);
            console.log(error);
          });
        
         octokit.repos.createOrUpdateFileContents({
          owner: "steveoni",
          repo: "scatteredNote",
          path: `userMeta/${user}.json`,
          message: `Create userMeta/${user}.json`,
          content: Buffer.from("{}").toString("base64"),
        })
          .then(() => {
            console.log(`User folder created: ${userFolder}`);
          })
          .catch((error) => {
            console.log(`Error creating user folder: ${userFolder}`);
            console.log(error);
          });
        
      } else {
        console.log(`Error getting user folder: ${userFolder}`);
        console.log(error);
      }
    });
}
