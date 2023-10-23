import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const { MainTopic, SubTopic, note, grab, views, tags, user, isPublic } = req.body;

  try {
    // create main topic directory if it doesn't exist
    const mainTopicPath = path.join(process.cwd(), `data/users/${user}`, MainTopic);
    if (!(await isDirectory(mainTopicPath))) {
      await fs.mkdir(mainTopicPath);
    }

    // create subtopic directory if it doesn't exist
    const subTopicPath = path.join(mainTopicPath, SubTopic);
    if (SubTopic && !(await isDirectory(subTopicPath))) {
      await fs.mkdir(subTopicPath);
    }

    // create note file if it doesn't exist
    const noteFilePath = path.join(subTopicPath || mainTopicPath, note.includes("json") ? note : `${note}.json`);
    if (!(await isFile(noteFilePath))) {
      await fs.writeFile(noteFilePath, JSON.stringify([]));
    }

    // add grab, views, and tags to note file
    const noteFile = JSON.parse(await fs.readFile(noteFilePath));
    noteFile.push({ grab, views, tags });
    await fs.writeFile(noteFilePath, JSON.stringify(noteFile));

    // add tags to usermeta/user.json
    const userMetaPath = path.join(process.cwd(), `data/userMeta/${user}.json`);
    const userMeta = JSON.parse(await fs.readFile(userMetaPath));
    if (!userMeta.tags) userMeta.tags = [];
    userMeta.tags = [...new Set([...userMeta?.tags, ...tags])];

    //add notefilepath to usermeta/user.json to specify isPublic
    const notePublic = `${MainTopic}/${SubTopic}/${note.includes("json") ? note : `${note}.json`}`
    userMeta[notePublic] = isPublic
    await fs.writeFile(userMetaPath, JSON.stringify(userMeta));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to save note." });
  }
}

async function isDirectory(path) {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      throw error;
    }
  }
}

async function isFile(path) {
  try {
    const stat = await fs.stat(path);
    return stat.isFile();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      throw error;
    }
  }
}
