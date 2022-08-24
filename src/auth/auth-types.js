module.exports = `
  type Mutation {
    signUp(email: String!, password: String!, name: String): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    updatePassword(currentPassword: String!, newPassword: String!): UpdatePasswordPayload!
  }

  type AuthPayload {
    token: String!
    userId: String!
  }

  type UpdatePasswordPayload {
    userId: String
  }
`;