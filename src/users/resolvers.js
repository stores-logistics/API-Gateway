import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../rbacSchema';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (parent, args, ctx, info) => {
			const request = getRequest(URL, '');
			return auth(request, ctx.header, info.fieldName);
		},
		userByCode: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args.code}`, 'GET');
			return auth(request, ctx.header, info.fieldName);
		},
		userByUsername: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/username/${args.username}`, 'GET');
			return request;//auth(request, ctx.header, info.fieldName);
		}
	},
	Mutation: {
		createUser: (parent, args, ctx, info) =>{
			const request = generalRequest(`${URL}`, 'POST', args.user);
			return auth(request, ctx.header, info.fieldName);
		},
		updateUser: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args.code}`, 'PUT', args.user);
			return auth(request, ctx.header, info.fieldName);
		},
		deleteUser: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args.code}`, 'DELETE');
			return auth(request, ctx.header, info.fieldName);
		}
	}
};

export default resolvers;
