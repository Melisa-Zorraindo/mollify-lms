const fs = require('fs');
const path = require('path');

const gitignoreTemplate = `
node_modules/
`;

function checkGitIgnore() {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  
  // Check if .gitignore already exists
  if (fs.existsSync(gitignorePath)) {
    // If it does, append template
    fs.appendFileSync(gitignorePath, gitignoreTemplate);
    console.log('.gitignore updated with template');
  } else {
    // If it doesn't, create new file with template
    fs.writeFileSync(gitignorePath, gitignoreTemplate);
    console.log('.gitignore created with template');
  }
}

exports.checkGitIgnore = checkGitIgnore