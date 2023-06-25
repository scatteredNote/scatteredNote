import { Octokit } from "@octokit/rest";
const path = require('path');

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

async function getDirectoryTree(directoryPath) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const result = {};

  const walk = async (dirPath, obj) => {
    const response = await octokit.rest.repos.getContent({
      owner: "scatteredNote",
      repo: "scatteredNote",
      path: dirPath,
    });

    obj.directory = [];
    obj.files = [];

    for (const item of response.data) {
      if (item.type === "dir") {
        const directoryPath = path.join(dirPath, item.name);
        const directoryObj = {
          directory: [],
          files: [],
        };
        obj.directory.push(item.name);
        obj[item.name] = directoryObj;
        await walk(directoryPath, directoryObj);
      } else {
        // check if item is a .json file
        if (item.name.split('.').pop() === 'json') {
          obj.files.push(item.name);
        }
      }
    }
  };

  await walk(directoryPath, result);
  return result;
}

function formatDirectoryTree(directoryTree) {
  const formattedTree = {};

  const processDir = (dirObj, tree, parentKey = "") => {
    const currentPath = parentKey ? `${parentKey}/${dirObj}` : dirObj;
    const currentObj = tree[dirObj];
    formattedTree[currentPath] = {
      directory: currentObj.directory.map((dir) => ({
        label: dir,
        value: `${currentPath}/${dir}`,
      })),
      files: currentObj.files.map((file) => ({
        label: file,
        value: `${currentPath}/${file}`,
      })),
    };
    currentObj.directory.forEach((dir) => {
      processDir(dir, currentObj, currentPath);
    });
  };

  Object.keys(directoryTree).forEach((dir) => {
    if (dir !== "directory" && dir !== "files") {
      processDir(dir, directoryTree);
    }
  });

  return formattedTree;
}

export async function generateDirectoryFilese(directoryPath) {
  const directoryTree = await getDirectoryTree(directoryPath);
  const formattedTree = formatDirectoryTree(directoryTree);
  return formattedTree;
}
