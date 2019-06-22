import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../rbacSchema';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allStores: (parent, args, ctx, info) => {
			return getRequest(URL, '');
			//const request = getRequest(URL, '');
			//return auth(request, ctx.header, info.fieldName);
		},
		storeByCode: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args.code}`, 'GET');
			return auth(request, ctx.header, info.fieldName);
		},
	},
	Mutation: {
		createStore: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}`, 'POST', args.store);
			return auth(request, ctx.header, info.fieldName);
		},
		updateStore: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args.code}`, 'PUT', args.store);
			return auth(request, ctx.header, info.fieldName);
		},
		deleteStore: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args.code}`, 'DELETE');
			return auth(request, ctx.header, info.fieldName);
		}
	}
};

export default resolvers;
