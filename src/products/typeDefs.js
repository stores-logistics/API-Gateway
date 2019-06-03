export const productsTypeDef = `
type Product { 
    _id: String
    name: String
    description: String
    type: String
    image: String
    storeId: Int
    quantity: Int
    cost: Float
}
input ProductInput {
    name: String!
    description: String!
    type: String!
    image: String!
    storeId: Int!
    quantity: Int!
    cost: Float!
}`;

export const productsQueries = `
    allProducts: [Product]!
    productByCode(_id: String!): Product!
    productsByName(name: String!): [Product]!
    productsByType(type: String!): [Product]!
    productsByStore(storeId: Int!): [Product]!
`;

export const productsMutations = `
    createProduct(product: ProductInput!): Product!
    deleteProduct(_id: String!): String!
    updateProduct(_id: String!, product: ProductInput!): Product!
`;
