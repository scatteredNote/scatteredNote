import { Octokit } from "@octokit/rest";


export async function createGithubFolder(user) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const userFolder = `users/${user}/.gitkeep`;

  // Check if user folder exists in repo
  octokit.repos.getContent({
    owner: "scatteredNote",
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
          owner: "scatteredNote",
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
          owner: "scatteredNote",
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

export async function generateDirectoryStructure(path, keyPrefix = '') {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });


  try {
    const response = await octokit.repos.getContent({
      owner: "scatteredNote",
      repo: "scatteredNote",
      path: path,
    });

    const result = [];

    for (const item of response.data) {
      const isDirectory = item.type === 'dir';
      const label = keyPrefix + item.name;
      const value = isDirectory ? `${label}/` : label;

      if (isDirectory) {
        if (label.split('/').length > 4) {
          const shortenedKey = label.split('/').slice(-3).join('/');
          result.push({ label: shortenedKey, value: `${label}` });
        } else {
          result.push({ label, value: `${label}` });
        }

        const subItems = await generateDirectoryStructure(item.path, `${label}/`);
        result.push(...subItems);
      }
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate directory structure.');
  }
}
