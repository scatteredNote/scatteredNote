import { Octokit } from "@octokit/rest";
import { getToken } from "next-auth/jwt"
import { cors, runMiddleware } from "../../libs/middleware"


export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    const { MainTopic, SubTopic, note, grab, views, tags, user, isPublic } = req.body;

    try {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN, // Add your GitHub access token here
      });

      // Create main topic directory if it doesn't exist
      const mainTopicPath = `users/${user}/${MainTopic}`;
      await createDirectoryIfNotExists(octokit, mainTopicPath);

      // Create subtopic directory if it doesn't exist
      const subTopicPath = SubTopic ? `${mainTopicPath}/${SubTopic}` : mainTopicPath;
      await createDirectoryIfNotExists(octokit, subTopicPath);

      // Create note file if it doesn't exist
      const noteFilePath = note.includes("json") ? `${subTopicPath}/${note}` : `${subTopicPath}/${note}.json`;
      await createFileIfNotExists(octokit, noteFilePath, "[]");

      // Add grab, views, and tags to note file
      const noteFileContent = await getFileContent(octokit, noteFilePath);
      const noteFile = JSON.parse(noteFileContent);
      noteFile.push({ grab, views, tags });
      await updateFileContent(octokit, noteFilePath, JSON.stringify(noteFile));

      // Add tags to usermeta/user.json
      const userMetaPath = `userMeta/${user}.json`;
      const userMetaContent = await getFileContent(octokit, userMetaPath);
      const userMeta = JSON.parse(userMetaContent);
      if (!userMeta.tags) userMeta.tags = [];
      userMeta.tags = [...new Set([...userMeta?.tags, ...tags])];
      await updateFileContent(octokit, userMetaPath, JSON.stringify(userMeta));

      // Add note file path to usermeta/user.json to specify isPublic
      let noteFilePath2 = noteFilePath.split("/").slice(2);
      userMeta[noteFilePath2.join("/")] = isPublic;
      await updateFileContent(octokit, userMetaPath, JSON.stringify(userMeta));

      // Add website url to web/website.json
      const { websiteUrl } = req.body;
      if (websiteUrl) {
        const websitePath = `web/website.json`;
        const websiteContent = await getFileContent(octokit, websitePath);
        const website = JSON.parse(websiteContent);
        if (!website[websiteUrl]) website[websiteUrl] = [];
        website[websiteUrl].push(noteFilePath);
        await updateFileContent(octokit, websitePath, JSON.stringify(website));
      }

      //revalidate is having lot of cache miss
      // await res.revalidate(`/${user}/notes`);
      // if (noteFilePath.includes("json")) {
      //   await res.revalidate(`/${user}/notes/${noteFilePath2.join("_").split(".json")[0]}`);
      // }
      // else {
      //   await res.revalidate(`/${user}/notes/${noteFilePath2.join("_")}`);
      // }
      res.status(200).json({ success: true, revalidated: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to save note." });
    }
  }
  else {
    res.status(401).json({ error: 'Unauthorized' })
  }

}

async function createDirectoryIfNotExists(octokit, directoryPath) {
  try {
    await octokit.repos.getContent({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      path: directoryPath,
    });
  } catch (error) {
    if (error.status === 404) {
      // Directory doesn't exist, create it
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.REPO_OWNER,
        repo: process.env.REPO_NAME,
        path: `${directoryPath}/.gitkeep`,
        message: `Create ${directoryPath}/.gitkeep`,
        content: Buffer.from("").toString("base64"),
      });
    } else {
      throw error;
    }
  }
}

async function createFileIfNotExists(octokit, filePath, content) {
  try {
    await octokit.repos.getContent({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      path: filePath,
    });
  } catch (error) {
    if (error.status === 404) {
      // File doesn't exist, create it
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.REPO_OWNER,
        repo: process.env.REPO_NAME,
        path: filePath,
        message: `Create ${filePath}`,
        content: Buffer.from(content).toString("base64"),
      });
    } else {
      throw error;
    }
  }
}

async function getFileContent(octokit, filePath) {
  const response = await octokit.repos.getContent({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    path: filePath,
  });

  const content = Buffer.from(response.data.content, "base64").toString("utf-8");
  return content;
}

async function updateFileContent(octokit, filePath, content) {
  const response = await octokit.repos.createOrUpdateFileContents({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    path: filePath,
    message: `Update ${filePath}`,
    content: Buffer.from(content).toString("base64"),
    sha: await getFileSha(octokit, filePath),
  });

  return response.data;
}

async function getFileSha(octokit, filePath) {
  const response = await octokit.repos.getContent({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    path: filePath,
  });

  return response.data.sha;
}