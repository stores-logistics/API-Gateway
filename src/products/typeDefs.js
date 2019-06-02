export const productsTypeDef = `
type Product { 
    code: Int!
    name: String!
    description: String!
    type: String!
    image: String!
    storeId: Int!
    quantity: Int!
    cost: Float!
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
    productByCode(code: Int!): Product!
    productsByName(name: String!): [Product]!
    productsByType(type: String!): [Product]!
    productsByStore(storeId: Int!): [Product]!
`;

export const productsMutations = `
    createProduct(product: ProductInput!): Product!
    deleteProduct(code: Int!): Int
    updateProduct(code: Int!, product: ProductInput!): Product!
`;
