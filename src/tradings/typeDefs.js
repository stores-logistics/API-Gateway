export const tradingsTypeDef = `
type Trading { 
    _id: String
    timestamp: String
    store_id: Int
    user_id: Int
    product_id: String
    price: Float
}
input TradingInput {
    timestamp: String!
    store_id: Int!
    user_id: Int!
    product_id: String!
    price: Float!
}`;

export const tradingsQueries = `
    allTradings: [Trading]!
    tradingByCode(_id: String!): Trading!
    tradingsByStoreId(store_id: Int!): [Trading]!
    tradingsByUserId(user_id: Int!): [Trading]!
`;

export const tradingsMutations = `
    createTrading(trading: TradingInput!): Trading!
    deleteTrading(_id: String!): String
    updateTrading(_id: String!, trading: TradingInput!): Trading!
`;

