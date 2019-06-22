import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../rbacSchema';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allTradings: (parent, args, ctx, info) => {
			const request = getRequest(URL, '');
			return auth(request, ctx.header, info.fieldName);
		},
		tradingByCode: (parent, args, ctx, info) =>{
			const request = generalRequest(`${URL}/${args._id}`, 'GET');
			return auth(request, ctx.header, info.fieldName);
		},
		tradingsByStoreId: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/store/${args.store_id}`, 'GET');
			return auth(request, ctx.header, info.fieldName);
		},
		tradingsByUserId: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/user/${args.user_id}`, 'GET');
			return auth(request, ctx.header, info.fieldName);
		},
	},
	Mutation: {
		createTrading: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}`, 'POST', args.trading);
			return auth(request, ctx.header, info.fieldName);
		},
		updateTrading: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args._id}`, 'PATCH', args.trading);
			return auth(request, ctx.header, info.fieldName);
		},
		deleteTrading: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args._id}`, 'DELETE');
			return auth(request, ctx.header, info.fieldName);
		}
	}
};

export default resolvers;
