import { generateDirectoryStructure, generateDirectoryFilese } from "../../libs/githubops"
import { cors, runMiddleware } from "../../libs/middleware"


export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  const { username } = req.query;
  const owner = username; // Assuming the GitHub username is the owner of the repository
  const userDir = `/users/${username}`; // Replace with your repository name

  try {
    const data = await generateDirectoryStructure(userDir);
    const directoryStructure = await generateDirectoryFilese(userDir);
    const response = { data, directoryStructure }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch directory structure." });
  }
}