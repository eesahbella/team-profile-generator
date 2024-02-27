const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

function promptManager() {
  console.log("Please enter the manager's information:");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the manager's name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a valid name.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter the manager's ID:",
        validate: (input) => {
          if (isNaN(input) || input.trim() === "") {
            return "Please enter a valid ID.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the manager's email:",
        validate: (input) => {
          // Simple email validation
          if (!/\S+@\S+\.\S+/.test(input)) {
            return "Please enter a valid email address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
        validate: (input) => {
          if (isNaN(input) || input.trim() === "") {
            return "Please enter a valid office number.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      promptTeamMembers();
    });
}

function promptTeamMembers() {
  console.log("Add a team member or finish building the team:");
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Choose the role of the team member:",
        choices: ["Engineer", "Intern", "Finish building the team"],
      },
    ])
    .then((answers) => {
      if (answers.role === "Finish building the team") {
        generateHTML();
      } else if (answers.role === "Engineer") {
        promptEngineer();
      } else if (answers.role === "Intern") {
        promptIntern();
      }
    });
}

function promptEngineer() {
  console.log("Please enter the engineer's information:");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the engineer's name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a valid name.";
          }
          return true;
        },
      },
      // Prompt for other engineer details (id, email, github)
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's ID:",
        validate: (input) => {
          if (isNaN(input) || input.trim() === "") {
            return "Please enter a valid ID.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's email:",
        validate: (input) => {
          if (!/\S+@\S+\.\S+/.test(input)) {
            return "Please enter a valid email address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a valid GitHub username.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.push(engineer);
      promptTeamMembers();
    });
}

function promptIntern() {
  console.log("Please enter the intern's information:");
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a valid name.";
          }
          return true;
        },
      },
      // Prompt for other intern details (id, email, school)
      {
        type: "input",
        name: "id",
        message: "Enter the intern's ID:",
        validate: (input) => {
          if (isNaN(input) || input.trim() === "") {
            return "Please enter a valid ID.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's email:",
        validate: (input) => {
          if (!/\S+@\S+\.\S+/.test(input)) {
            return "Please enter a valid email address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a valid school name.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      promptTeamMembers();
    });
}

function generateHTML() {
  const html = render(teamMembers);
  try {
    fs.writeFileSync(outputPath, html);
    console.log("Successfully wrote to team.html!");
  } catch (err) {
    console.error(err);
  }
}

// Start by prompting for the manager's information
promptManager();
