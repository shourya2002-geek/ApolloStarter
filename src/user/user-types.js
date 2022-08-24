
module.exports = `
type Query {
  me: User
}
type User {
  _id: String
  name: String
  email: String
}
`;