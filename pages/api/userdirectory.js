import { generateDirectoryStructure } from "../../libs/githubops"

export default async function handler(req, res) {
  const { username } = req.query;
  const owner = username; // Assuming the GitHub username is the owner of the repository
  const repo = `/users/${username}`; // Replace with your repository name

  try {
    console.log("GET HERE")
    const directoryStructure = await generateDirectoryStructure(repo);
    res.status(200).json(directoryStructure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch directory structure." });
  }
}