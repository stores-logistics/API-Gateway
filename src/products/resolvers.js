import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (_) =>
			getRequest(URL, ''),
		productByCode: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'GET'),
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
		updateProduct: (_, { code, product }) =>
			generalRequest(`${URL}/${code}`, 'PUT', product),
		deleteProduct: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'DELETE')
	}
};

export default resolvers;