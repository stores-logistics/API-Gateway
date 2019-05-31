export const storesTypeDef = `
type Store { 
    code: Int!
    name: String!
    credits: Int!
    professor: String!
}
input StoreInput {
    name: String!
    credits: Int!
    professor: String!
}`;

export const storesQueries = `
    allStores: [Store]!
    storeByCode(code: Int!): Store!
`;

export const storesMutations = `
    createStore(store: StoreInput!): Store!
    deleteStore(code: Int!): Int
    updateStore(code: Int!, store: StoreInput!): Store!
`;