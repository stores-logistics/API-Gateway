export const usersTypeDef = `
type User { 
    code: Int!
    name: String!
    lastName: String!
    cabin: String!
    creditCard: String!
}
input UserInput {
    name: String!
    lastName: String!
    cabin: String!
    creditCard: String!
}`;

export const usersQueries = `
    allUsers: [User]!
    userByCode(code: Int!): User!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(code: Int!): Int
    updateUser(code: Int!, user: UserInput!): User!
`;