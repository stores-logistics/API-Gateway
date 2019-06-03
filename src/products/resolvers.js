import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (_) =>
			getRequest(URL, ''),
		productByCode: (_, { _id }) =>
			generalRequest(`${URL}/${_id}`, 'GET'),
		productsByName: (_, { name }) => 
			generalRequest(`${URL}/name/${name}`, 'GET'),
		productsByType: (_, { type }) => 
			generalRequest(`${URL}/type/${type}`, 'GET'),
		productsByStore: (_, { storeId }) => 
			generalRequest(`${URL}/store/${storeId}`, 'GET')
	},
	Mutation: {
		createProduct: (_, { product }) =>
			generalRequest(`${URL}`, 'POST', product),
		updateProduct: (_, { _id, product }) =>
			generalRequest(`${URL}/${_id}`, 'PATCH', product),
		deleteProduct: (_, { _id }) =>
			generalRequest(`${URL}/${_id}`, 'DELETE')
	}
};

export default resolvers;