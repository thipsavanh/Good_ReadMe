const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

const user = "username";
const client_id = "Iv1.8c9191b1c1f457a1";
const client_secret = "6d5b4e8d24f9e893fe61aff615df904770e72922";

axios.get(`https://api.github.com/users/${user}?client_id=${client_id}&
    client_secret=${client_secret}`);

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
        name: "contents",
        message: "Enter your table of contents."
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

function generateReadme(answers) {
    return `
    # Project Title
    ${answers.title}

    ## Description
    ${answers.description}

    ## Table of Contents
    ${answers.contents}
    * [Installation](## Installation)
    * [Usage] (## Usage)
    * [License] (## License)
    * [Contributing] (## Contributing)
    * [Tests] (## Tests)
    * [Questions] (## Tests)
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

    ## Badge
    https://img.shields.io/badge/<README>-<100%>-<green>

    ## Tests
    ${answers.tests}

    ## Questions
    ${answers.questions}
    `;
}

async function init() {
  console.log("success")
  try {
    const answers = await promptUser();

    const readMe = generateReadme(answers);

    await writeFileAsync("README.md", readMe)

  } catch(err) {
    console.log(err);
  }
}

init();