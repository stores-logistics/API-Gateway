export const storesTypeDef = `
type Store { 
    code: Int
    name: String
    type: String
    owner: String
    ubication: String
    dates: String
    description: String
    img: String
}
input StoreInput {
    name: String!
    type: String!
    owner: String!
    ubication: String!
    dates: String!
    description: String!
    img: String!
}`;

export const storesQueries = `
    allStores: [Store]!
    storeByCode(code: Int!): Store!
`;

export const storesMutations = `
    createStore(store: StoreInput!): Store!
    deleteStore(code: Int!): String
    updateStore(code: Int!, store: StoreInput!): Store!
`;
