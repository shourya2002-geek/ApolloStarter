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
