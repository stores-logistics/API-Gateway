import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	productsMutations,
	productsQueries,
	productsTypeDef
} from './products/typeDefs';

import productsResolvers from './products/resolvers';

import {
	storesMutations,
	storesQueries,
	storesTypeDef
} from './stores/typeDefs';

import storesResolvers from './stores/resolvers';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';

import usersResolvers from './users/resolvers';

import {
	tradingsMutations,
	tradingsQueries,
	tradingsTypeDef
} from './tradings/typeDefs';

import tradingsResolvers from './tradings/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		tradingsTypeDef,
		productsTypeDef,
		storesTypeDef,
		usersTypeDef
	],
	[
		tradingsQueries,
		productsQueries,
		storesQueries,
		usersQueries
	],
	[
		tradingsMutations,
		productsMutations,
		storesMutations,
		usersMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		tradingsResolvers,
		productsResolvers,
		usersResolvers,
		storesResolvers
	)
});
