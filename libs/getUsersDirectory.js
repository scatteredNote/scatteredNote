const fs = require('fs');
const path = require('path');

export const getUsersData = (dirPath) => {
  const usersData = [];
  const dirs = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const userData = { name: dir.name, children: [] };
      const dirFullPath = path.join(dirPath, dir.name);
      const filesAndDirs = fs.readdirSync(dirFullPath, {
        withFileTypes: true,
      });
      for (const fileOrDir of filesAndDirs) {
        if (fileOrDir.isFile()) {
          userData.children.push({ name: fileOrDir.name });
        } else if (fileOrDir.isDirectory()) {
          const subDirData = getDirDataRecursive(
            path.join(dirFullPath, fileOrDir.name)
          );
          userData.children.push(subDirData);
        }
      }
      usersData.push(userData);
    }
  }
  return usersData;
};

export const getDirDataRecursive = (dirPath) => {
  const dirData = { name: path.basename(dirPath), children: [] };
  const filesAndDirs = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const fileOrDir of filesAndDirs) {
    if (fileOrDir.isFile()) {
      dirData.children.push({ name: fileOrDir.name });
    } else if (fileOrDir.isDirectory()) {
      const subDirData = getDirDataRecursive(
        path.join(dirPath, fileOrDir.name)
      );
      dirData.children.push(subDirData);
    }
  }
  return dirData;
};
