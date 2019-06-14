import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allStores: (_) =>
			getRequest(URL, ''),
		storeByCode: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'GET'),
	},
	Mutation: {
		createStore: (_, { store }) =>
			generalRequest(`${URL}`, 'POST', store),
		updateStore: (_, { code, store }) =>
			generalRequest(`${URL}/${code}`, 'PUT', store),
		deleteStore: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'DELETE')
	}
};

export default resolvers;
