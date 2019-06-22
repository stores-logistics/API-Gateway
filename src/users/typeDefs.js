export const usersTypeDef = `
enum roles {
    Admin
    Manager
    Passanger
}

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
    type: roles
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
    type: roles!
    storeId: String!
}`;

export const usersQueries = `
    allUsers: [User]!
    userByCode(code: Int!): User!
    userByUsername(username: String!): User!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(code: Int!): Int
    updateUser(code: Int!, user: UserInput!): User!
`;
