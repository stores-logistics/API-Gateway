'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const productsTypeDef = `
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

const productsQueries = `
    allProducts: [Product]!
    productByCode(_id: String!): Product!
    productsByName(name: String!): [Product]!
    productsByType(type: String!): [Product]!
    productsByStore(storeId: Int!): [Product]!
`;

const productsMutations = `
    createProduct(product: ProductInput!): Product!
    deleteProduct(_id: String!): String!
    updateProduct(_id: String!, product: ProductInput!): Product!
`;

const url = process.env.PRODUCTS_URL;
const port = process.env.PRODUCTS_PORT;
const entryPoint = process.env.PRODUCTS_ENTRY;

function AuthRbac(request$$1, header, method){
    try {
        const {type} = isValidToken(header);
        isValidRole(type, method);
        return request$$1;
    }catch(ex){
        return ex;
    }
}



function isValidToken(header){
    if (header.authorization) {
		const token = header.authorization.match(/Bearer ([A-Za-z0-9\S\/\-\_\.]+)/);
		if (token && token[1]) {
            try{
                const decoded = jwt.verify(token[1], 'Secret Password');
                return decoded;
            } catch(ex){
                throw ex;
            }
		}
    }   
}

function isValidRole(role, method){
    if (!rbac[method][role])
        throw "Yo are not authorized to do that operation.";
}

const rbac = {
    login: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },

    allProducts: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productsByName: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productsByType: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productsByStore: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createProduct: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    deleteProduct: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    updateProduct: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },

    allStores: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    storeByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createStore: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    deleteStore: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    updateStore: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },

    allTradings: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    tradingByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    tradingsByStoreId: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    tradingsByUserId: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createTrading: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    deleteTrading: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    updateTrading: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },

    allUsers: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    userByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    userByUsername: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createUser: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    deleteUser: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    updateUser: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    }
};

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (parent, args, ctx, info) => {
			const request$$1 = getRequest(URL, '');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		productByCode: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL}/${args._id}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		productsByName: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL}/name/${args.name}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName); 
		},
		productsByType: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL}/type/${args.type}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName); 
		},
		productsByStore: (parent, args, ctx, info) => {
			return generalRequest(`${URL}/store/${args.storeId}`, 'GET');
			//const request = generalRequest(`${URL}/store/${args.storeId}`, 'GET');
			//return auth(request, ctx.header, info.fieldName); 
		}
	},
	Mutation: {
		createProduct: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL}`, 'POST', args.product);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		updateProduct: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL}/${args._id}`, 'PATCH', args.product);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		deleteProduct: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL}/${args._id}`, 'DELETE');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		}
	}
};

const storesTypeDef = `
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

const storesQueries = `
    allStores: [Store]!
    storeByCode(code: Int!): Store!
`;

const storesMutations = `
    createStore(store: StoreInput!): Store!
    deleteStore(code: Int!): Int
    updateStore(code: Int!, store: StoreInput!): Store!
`;

const url$1 = process.env.STORES_URL;
const port$1 = process.env.STORES_PORT;
const entryPoint$1 = process.env.STORES_ENTRY;

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allStores: (parent, args, ctx, info) => {
			return getRequest(URL$1, '');
			//const request = getRequest(URL, '');
			//return auth(request, ctx.header, info.fieldName);
		},
		storeByCode: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$1}/${args.code}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
	},
	Mutation: {
		createStore: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$1}`, 'POST', args.store);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		updateStore: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$1}/${args.code}`, 'PUT', args.store);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		deleteStore: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$1}/${args.code}`, 'DELETE');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		}
	}
};

const usersTypeDef = `
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

const usersQueries = `
    allUsers: [User]!
    userByCode(code: Int!): User!
    userByUsername(username: String!): User!
`;

const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(code: Int!): Int
    updateUser(code: Int!, user: UserInput!): User!
`;

const url$2 = process.env.USERS_URL;
const port$2 = process.env.USERS_PORT;
const entryPoint$2 = process.env.USERS_ENTRY;

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allUsers: (parent, args, ctx, info) => {
			const request$$1 = getRequest(URL$2, '');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		userByCode: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$2}/${args.code}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		userByUsername: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${"http://35.193.251.100:3000/users-ms/resources/auth"}/username/${args.username}`, 'GET');
			return request$$1;//auth(request, ctx.header, info.fieldName);
		}
	},
	Mutation: {
		createUser: (parent, args, ctx, info) =>{
			const request$$1 = generalRequest(`${URL$2}`, 'POST', args.user);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		updateUser: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$2}/${args.code}`, 'PUT', args.user);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		deleteUser: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$2}/${args.code}`, 'DELETE');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		}
	}
};

const loginTypeDef = `
input LoginInput {
    username: String!
    password: String!
}`;

const loginQueries = `
`;

const loginMutations = `
    login(credentials: LoginInput!): String!
`;

const url$3 = process.env.LOGIN_URL;
const port$3 = process.env.LOGIN_PORT;
const entryPoint$3 = process.env.LOGIN_ENTRY;

var jwt$2 = require('jsonwebtoken');
const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const crypto = require('crypto');

const resolvers$3 = {
	Query: {
	},
	Mutation: {
		login: async (_, { credentials }) =>{
			//let pass = decrypt(credentials.password);
			//credentials.password = pass;
			try{
				let res = await	generalRequest(`${URL$3}`, 'POST', credentials);
				if(res){
						var token = await jwt$2.sign(res, 'Secret Password', {expiresIn: "1h"});
						return token			
				}else{
					return -1
				}
			}catch(err){
				console.log(err);
			}			
		}			
	}
};

const tradingsTypeDef = `
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

const tradingsQueries = `
    allTradings: [Trading]!
    tradingByCode(_id: String!): Trading!
    tradingsByStoreId(store_id: Int!): [Trading]!
    tradingsByUserId(user_id: Int!): [Trading]!
`;

const tradingsMutations = `
    createTrading(trading: TradingInput!): Trading!
    deleteTrading(_id: String!): String
    updateTrading(_id: String!, trading: TradingInput!): Trading!
`;

const url$4 = process.env.TRADINGS_URL;
const port$4 = process.env.TRADINGS_PORT;
const entryPoint$4 = process.env.TRADINGS_ENTRY;

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$4}`;

const resolvers$4 = {
	Query: {
		allTradings: (parent, args, ctx, info) => {
			const request$$1 = getRequest(URL$4, '');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		tradingByCode: (parent, args, ctx, info) =>{
			const request$$1 = generalRequest(`${URL$4}/${args._id}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		tradingsByStoreId: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$4}/store/${args.store_id}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		tradingsByUserId: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$4}/user/${args.user_id}`, 'GET');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
	},
	Mutation: {
		createTrading: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$4}`, 'POST', args.trading);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		updateTrading: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$4}/${args._id}`, 'PATCH', args.trading);
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		},
		deleteTrading: (parent, args, ctx, info) => {
			const request$$1 = generalRequest(`${URL$4}/${args._id}`, 'DELETE');
			return AuthRbac(request$$1, ctx.header, info.fieldName);
		}
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		tradingsTypeDef,
		productsTypeDef,
		storesTypeDef,
		usersTypeDef,
		loginTypeDef
	],
	[
		tradingsQueries,
		productsQueries,
		storesQueries,
		usersQueries,
		loginQueries
	],
	[
		tradingsMutations,
		productsMutations,
		storesMutations,
		usersMutations,
		loginMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers$4,
		resolvers,
		resolvers$2,
		resolvers$1,
		resolvers$3
	)
});

var jwt$1 = require('jsonwebtoken');

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
//router.post('/graphql', koaBody(), (ctx, next) => graphqlKoa({ schema: schemas.EmailSchema, formatError, context: ctx })(ctx, next));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
