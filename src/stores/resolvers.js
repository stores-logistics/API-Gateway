import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allStores: (_) =>
			getRequest(URL, ''),
		storeByCode: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createStore: (_, { store }) =>
			generalRequest(`${URL}`, 'POST', store),
		updateStore: (_, { id, store }) =>
			generalRequest(`${URL}/${id}`, 'PATCH', store),
		deleteStore: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
