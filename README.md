Web project starter kit including modern tools and workflow based on
[angular-cli](https://github.com/angular/angular-cli), best practices from the community, a scalable base template and
a good learning base.

### Benefits

- Quickstart a project in seconds and focus on features, not on frameworks or tools

- Scalable architecture with base app template including example components, services and tests

# Getting started

1. Go to project folder and install dependencies:

 ```bash
 npm install
 ```

2. Launch development server, and open `localhost:4200` in your browser:

 ```bash
 npm start
 ```

### Commit culture

Commit Convention is described in [this article](https://www.conventionalcommits.org/en/v1.0.0-beta.4/), here are seven
simple rules:

1. Each commit message consists of a header, a body, and a footer.

   <header>
   <BLANK LINE>
   <body>
   <BLANK LINE>
   <footer>

- The header is mandatory and must conform to the Commit Message Header format.
- The body is mandatory for all commits except for those of type "docs".
  When the body is present it must be at least 20 characters long and must conform to the Commit Message Body format.
- The footer is optional. The Commit Message Footer format describes what the footer is used for and the structure it
  must have.

2. Commit Message Header

   ```
   <type>(<scope>): <short summary>
     │       │             │
     │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
     │       │
     │       └─⫸ Commit Scope: common|core|account-crud|migrations
     │
     └─⫸ Commit Type: build|docs|feat|fix|refactor|test


   The <type> and <summary> fields are mandatory, the (<scope>) field is optional.
   ```
3. Type

   Must be one of the following:

- build: Changes that affect the build system or external dependencies (example scopes: npm, infra)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests

4. Scope

   Usually the scope should be the name of task.

- none/empty string: useful for test and refactor changes that are done across all packages (
  e.g. `test: add missing unit tests`) and for docs changes that are not related to a specific package (
  e.g. `docs: fix typo in tutorial`).

5. Summary

   Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

6. Commit Message Body

   Use the body to explain what and why vs. how

7. Commit Message Footer

   The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub
   issues, Jira tickets, and other PRs that this commit closes or is related to.
