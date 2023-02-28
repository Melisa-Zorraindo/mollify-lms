#!/usr/bin/env node

const { prompt } = require('enquirer');
const findMarkdownFiles = require('./findMarkdown.cjs');
const processMarkdownFiles = require('./processMarkdown.cjs');
const { checkGitIgnore } = require('./scaffoldCourse.cjs');

const ignore = [
  "node_modules"
]

function scaffold() {
  checkGitIgnore()
}

function generateCourseCode(courseName) {
  // Define an array of common words to remove
  var commonWords = ['and', 'of', 'to', 'a', 'the', 'in', 'is', 'are', 'with', 'for', 'on', 'at', 'from', 'by', 'about', 'into', 'onto', 'out', 'up', 'down', 'off', 'over', 'under', 'around'];

  // Remove common words from courseName
  var words = courseName.toLowerCase().split(' ').filter(function (word) {
    return commonWords.indexOf(word) === -1;
  });

  // Take the first letter of each word remaining
  var letters = words.map(function (word) {
    return word.charAt(0);
  });

  // Trim to 4 characters
  var code = letters.join('').substr(0, 4);

  // If the result is less than 4 in length, take the first 4 from the coursename
  if (code.length < 4) {
    code = courseName.substr(0, 4);
  }

  // Uppercase
  code = code.toUpperCase();

  // Add 1 to the string
  code = parseInt(code, 36) + 1; // Convert to base 36, add 1, and convert back to string
  console.log(code)
  return code;
}

async function askUser() {
  const response = await prompt({
    type: 'confirm',
    name: 'freshProject',
    message: 'Are you starting a fresh project?',
    initial: true
  });

  if (response.freshProject) {
    console.log('Great, let\'s get started!');

    const response = await prompt([{
      type: 'text',
      name: 'courseName',
      message: 'What is the name of this course?',
      initial: "Example Course"
    }, {
      type: 'text',
      name: 'courseCode',
      message: 'What is the code for this course?',
      // when: answers => answers.courseName && answers.courseName.trim(),
      initial: answers => {
        // const code = generateCourseCode(answers.courseName)
        // console.log('code', code);
        console.log(answers);
        return "test"
      },
    }]);

    console.log(response);

    scaffold()
    // Do something if the user answers "yes"
  } else {
    console.log('Okay, we\'ll assume you have an existing project.');
    console.log('During development we\'ll assume that all content is in the root directory');
    // Do something if the user answers "no"
    const files = findMarkdownFiles(process.cwd(), ignore);
    processMarkdownFiles(files)
  }
}

askUser();