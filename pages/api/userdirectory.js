import { generateDirectoryStructure, generateDirectoryFilese } from "../../libs/githubops"

export default async function handler(req, res) {
  const { username } = req.query;
  const owner = username; // Assuming the GitHub username is the owner of the repository
  const userDir = `/users/${username}`; // Replace with your repository name

  try {
    const data = generateDirectoryStructure(userDir);
    const directoryStructure = generateDirectoryFilese(userDir);
    const response = { data, directoryStructure }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch directory structure." });
  }
}