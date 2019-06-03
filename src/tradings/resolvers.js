import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allTradings: (_) =>
			getRequest(URL, ''),
		tradingByCode: (_, { _id }) =>
			generalRequest(`${URL}/${_id}`, 'GET'),
		tradingsByStoreId: (_, { store_id }) =>
			generalRequest(`${URL}/store/${store_id}`, 'GET'),
		tradingsByUserId: (_, { user_id }) =>
			generalRequest(`${URL}/user/${user_id}`, 'GET'),
	},
	Mutation: {
		createTrading: (_, { trading }) =>
			generalRequest(`${URL}`, 'POST', trading),
		updateTrading: (_, { _id, trading }) =>
			generalRequest(`${URL}/${_id}`, 'PATCH', trading),
		deleteTrading: (_, { _id }) =>
			generalRequest(`${URL}/${_id}`, 'DELETE')
	}
};

export default resolvers;
