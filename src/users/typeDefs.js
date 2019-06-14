export const usersTypeDef = `
type User { 
    code: Int
    name: String
    lastName: String
    cabin: String
    creditCard: String
    username: String
    password: String
    phoneNumber: String
    address: String
    city: String
    age: Int
    avatar: String
    type: String
    storeId: String
}
input UserInput {
    name: String!
    lastName: String!
    cabin: String!
    creditCard: String!
    username: String!
    password: String!
    phoneNumber: String!
    address: String!
    city: String!
    age: Int!
    avatar: String!
    type: String!
    storeId: String!
}`;

export const usersQueries = `
    allUsers: [User]!
    userByCode(code: Int!): User!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(code: Int!): User!
    updateUser(code: Int!, user: UserInput!): User!
`;
