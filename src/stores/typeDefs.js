export const storesTypeDef = `
type Store { 
    id: Int
    name: String
    type: String
    owner: String
    ubication: String
    dates: String
}
input StoreInput {
    name: String!
    type: String!
    owner: String!
    ubication: String!
    dates: String!
}`;

export const storesQueries = `
    allStores: [Store]!
    storeByCode(id: Int!): Store!
`;

export const storesMutations = `
    createStore(store: StoreInput!): Store!
    deleteStore(id: Int!): String
    updateStore(id: Int!, store: StoreInput!): Store!
`;