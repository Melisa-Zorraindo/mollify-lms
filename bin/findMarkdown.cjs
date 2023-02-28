const fs = require('fs');
const path = require('path');

function findMarkdownFiles(dirPath, ignore = []) {
  const markdownFiles = [];

  function search(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      if (ignore.some(ignorePath => filePath.includes(ignorePath))) return

      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        search(filePath);
      } else if (path.extname(file).toLowerCase() === '.md') {
        markdownFiles.push(filePath);
      }
    }
  }

  search(dirPath);

  return markdownFiles;
}

module.exports = findMarkdownFiles