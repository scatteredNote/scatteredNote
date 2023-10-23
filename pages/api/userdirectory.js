import { generateDirectoryStructure, generateDirectoryFilese, getTags } from "../../libs/githubops"
import { cors, runMiddleware } from "../../libs/middleware"


export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  const { username } = req.query;
  const owner = username; // Assuming the GitHub username is the owner of the repository
  const userDir = `data/users/${username}`; // Replace with your repository name

  try {
    const data = await generateDirectoryStructure(userDir);
    const directoryStructure = await generateDirectoryFilese(userDir);
    const tags = await getTags(username)
    const response = { data, directoryStructure, tags }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch directory structure." });
  }
}