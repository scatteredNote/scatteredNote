import { Octokit } from "@octokit/rest";
import { getToken } from "next-auth/jwt"
import { cors, runMiddleware } from "../../libs/middleware"


export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    const { user, slug } = req.query;
    const userDir = `data/users/${user}/${slug}.json`;

    try {
      const response = await octokit.repos.getContent({
        owner: 'scatteredNote',
        repo: 'scatteredNote',
        path: userDir,
      });

      if (response.data.type === "file") {
        const content = Buffer.from(response.data.content, "base64").toString("utf-8");
        res.status(200).json(JSON.parse(content));
      }
    } catch (error) {
      res.status(404).json({ success: false, error: "Not found." });
    }
  }
  else {
    res.status(401).json({ success: false, error: "Unauthorized." });
  }
}