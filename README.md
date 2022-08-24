## Apollo GraphQL Starter Project

Starter API project with Node, Apollo Server, GraphQL, (WIP) authentication, (WIP) password requesting and resetting, email configuration, current user in api, file structure, code formatting with prettier/eslint, and code format enforcement on git commits with husky. Mongo DB and Mongoose are initially set up, but can easily be swapped for whatever DB you use.

For extra code formatting goodness, install prettier in your IDE and turn on formatting on save. Here are the instructions for [Visual Studio Code](https://github.com/prettier/prettier-vscode).

### Updating to latest package releases

To quickly and simply force update all packages to their latest release:

```
> npm run packages:update
```

### Running project
If you want to use Mongo DB the project is set up for it (Mong DB and Mongoose packages). If not simply swap out the info in config/db and the code in the model files. Once that is done you can continue.

```
> npm install
> npm run db:seed
> npm run dev
```

Once the server is running you can go to localhost:3000 to get to GraphQL playground.

### Email setup and sending
Testing email is made very simple with [ethereal](https://ethereal.email/). Sign up for an account, and then fill in the username and password variables in .env with your username and password. This will allow you to send emails in development which will be caught by ethereal and made viewable in the browser. To send email use sendEmail found in ./src/app/email/send-email.

### Running authenticated queries in Graphql playground

First run the sign in method to get an auth token:

```
mutation {
  signIn(email:"user@gmail.com", password:"password") {
    token
    userId
  }
}
```

Then under headers set the token like so:

```
{
  "Authorization": "Bearer <my-token>"
}
```

### Code formatting

#### File Naming

All file names are lower cased and dash (-) separated. Much thought and turmoil went into this decision but was influenced by multiple articles:

- https://blog.codinghorror.com/of-spaces-underscores-and-dashes/
- https://x-equals.com/dashes-versus-underscores/

#### Folder structure

- config/ - Application config including db, jest/testing, etc.
- seed/ - Database seeding related files. Initial seeds for users are present to show structure.
- src/ - Application logic.
  - src/app - Global/shared app logic.
  - src/<entity-folder> - All logic is separated by entity or resource. Files in each folder are named as "entity-"file-purpose".js". Examples are: (user-utils.js, user-model.js, etc...).
  - src/"entity-folder"/"entity-files" - Initial structure is:
    - entity-model.js - DB model.
    - entity-types.js - GraphQL types.
    - entity-resolvers.js - GraphQL resolvers.
    - entity-utils.js - Non-database related functions.
    - entity-services.js - Detabase related functions.
