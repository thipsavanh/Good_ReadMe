const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

const client_id = "Iv1.8c9191b1c1f457a1";
const client_secret = "6d5b4e8d24f9e893fe61aff615df904770e72922";

function promptUser() {
    return inquirer.prompt([
     {
        type: "input",
        name: "username",
        message: "Enter your GitHub Username."
     },
     {
         type: "input",
         name: "title",
         message: "What is your project title?"
     },
     {
        type: "input",
        name: "description",
        message: "Describe your project."
    },
    {
        type: "input",
        name: "installation",
        message: "Installation?"
    },
    {
        type: "input",
        name: "usage",
        message: "Usage?"
    },
    {
        type: "input",
        name: "license",
        message: "License?"
    },
    {
        type: "input",
        name: "contributing",
        message: "Contributing?"
    },
    {
        type: "input",
        name: "tests",
        message: "Tests?"
    },
    {
        type: "input",
        name: "questions",
        message: "Questions?"
    }
  ]);
}

function generateReadme(answers, data) {
    return `
# Project Title
    ${answers.title}

## Description
    ${answers.description}    

## Table of Contents
- [Installation](##-Installation)
- [Usage](##-Usage)
- [License](##-License)
- [Contributing](##-Contributing)
- [Tests](##-Tests)
- [Questions](##-Questions)
    *  User GitHub profie picture
    *  User GitHub email
    
## Installation
    ${answers.installation}

## Usage
    ${answers.usage}

## License
    ${answers.license}

## Contributing
    ${answers.contributing}

## Tests
    ${answers.tests}

## Questions
    ${answers.questions}
-![github user image])${data.avatar_url}
-${data.email}
    `
}

async function init() {
  try {
    const answers = await promptUser();

    const response = await axios.get(`https://api.github.com/users/${answers.username}?client_id=${client_id}&
    client_secret=${client_secret}&user-agent=${answers.username}`);

    const readMe = await generateReadme(answers, response.data);

    await writeFileAsync("README.md", readMe)

  } catch(err) {
    console.log(err);
  }
}

init();