export const tradingsTypeDef = `
type Trading { 
    code: ID!
    timestamp: DateTime!
    store_id: Int!
    user_id: Int!
    product_id: String!
    price: Float!
}
input TradingInput {
    timestamp: DateTime!
    store_id: Int!
    user_id: Int!
    product_id: String!
    price: Float!
}`;

export const tradingsQueries = `
    allTradings: [Trading]!
    tradingByCode(code: Int!): Trading!
    tradingsByStoreId(code: Int!): [Trading]!
    tradingsByUserId(code: Int!): [Trading]!
`;

export const tradingsMutations = `
    createTrading(trading: TradingInput!): Trading!
    deleteTrading(code: Int!): String
    updateTrading(code: Int!, trading: TradingInput!): Trading!
`;

