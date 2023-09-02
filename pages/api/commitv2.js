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
      const subTopicPath = SubTopic ? `${mainTopicPath}/${SubTopic}` : mainTopicPath;
      const noteFilePath = note.includes("json") ? `${subTopicPath}/${note}` : `${subTopicPath}/${note}.json`;
      await createOrUpdateFileContent(octokit, noteFilePath, { grab, views, tags });

      // Add tags to usermeta/user.json
      const userMetaPath = `userMeta/${user}.json`;
      const { content: userMetaContent, sha: metasha } = await getFileContent(octokit, userMetaPath);
      const userMeta = JSON.parse(userMetaContent);
      if (!userMeta.tags) userMeta.tags = [];
      userMeta.tags = [...new Set([...userMeta?.tags, ...tags])];
      let noteFilePath2 = noteFilePath.split("/").slice(2);
      userMeta[noteFilePath2.join("/")] = isPublic;
      await updateFileContent(octokit, userMetaPath, metasha, JSON.stringify(userMeta));

      // Add website url to web/website.json
      const { websiteUrl } = req.body;
      if (websiteUrl) {
        const websitePath = `web/website.json`;
        const { content: websiteContent, sha: websiteSha } = await getFileContent(octokit, websitePath);
        const website = JSON.parse(websiteContent);
        if (!website[websiteUrl]) website[websiteUrl] = [];
        website[websiteUrl].push(noteFilePath);
        await updateFileContent(octokit, websitePath, websiteSha, JSON.stringify(website));
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

async function getFileContent(octokit, filePath) {
  const response = await octokit.repos.getContent({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    path: filePath,
  });

  const content = Buffer.from(response.data.content, "base64").toString("utf-8");
  return { content, sha: response.data.sha };
}

async function updateFileContent(octokit, filePath, sha, content) {
  const response = await octokit.repos.createOrUpdateFileContents({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    path: filePath,
    message: `Update ${filePath}`,
    content: Buffer.from(content).toString("base64"),
    sha: sha,
  });

  return response.data;
}


async function createOrUpdateFileContent(octokit, filePath, content) {
  try {
    const response = await octokit.repos.getContent({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      path: filePath,
    });

    // File exists, fetch its content and append the new data
    const existingContent = Buffer.from(response.data.content, "base64").toString("utf-8");
    const newContent = JSON.parse(existingContent);
    newContent.push(content);

    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      path: filePath,
      message: `Update ${filePath}`,
      content: Buffer.from(JSON.stringify(newContent)).toString("base64"),
      sha: response.data.sha, // Provide the SHA to update the existing file
    });

    return newContent;
  } catch (error) {
    if (error.status === 404) {
      // File doesn't exist, create it with the provided content
      const initialContent = [content];
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.REPO_OWNER,
        repo: process.env.REPO_NAME,
        path: filePath,
        message: `Create ${filePath}`,
        content: Buffer.from(JSON.stringify(initialContent)).toString("base64"),
      });

      return initialContent;
    } else {
      throw error;
    }
  }
}
