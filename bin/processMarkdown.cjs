const fs = require('fs');
const path = require('path');

function processMarkdownFile(filePath) {
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  const newDirPath = path.join(dir, base);
  fs.mkdirSync(newDirPath);

  const newFilePath = path.join(newDirPath, `+page${ext}`);
  fs.renameSync(filePath, newFilePath);

  console.log(`${filePath} moved to ${newFilePath}`);
}

function processMarkdownFiles(paths) {
  paths.forEach(processMarkdownFile);
}

module.exports = processMarkdownFiles