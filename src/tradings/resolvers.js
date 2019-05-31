import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allTradings: (_) =>
			getRequest(URL, ''),
		tradingByCode: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'GET'),
		tradingsByStoreId: (_, { code }) =>
			generalRequest(`${URL}/store/${code}`, 'GET'),
		tradingsByUserId: (_, { code }) =>
			generalRequest(`${URL}/user/${code}`, 'GET'),
	},
	Mutation: {
		createTrading: (_, { trading }) =>
			generalRequest(`${URL}`, 'POST', trading),
		updateTrading: (_, { code, trading }) =>
			generalRequest(`${URL}/${code}`, 'PUT', trading),
		deleteTrading: (_, { code }) =>
			generalRequest(`${URL}/${code}`, 'DELETE')
	}
};

export default resolvers;
