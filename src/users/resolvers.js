import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../security/security';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return getRequest(URL, '');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		userByCode: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args.code}`, 'GET');
			}catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		userByUsername: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/username/${args.username}`, 'GET');
			return request;//auth(request, ctx.header, info.fieldName);
		}
	},
	Mutation: {
		createUser: (parent, args, ctx, info) =>{
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}`, 'POST', args.user);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		updateUser: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args.code}`, 'PUT', args.user);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		deleteUser: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args.code}`, 'DELETE');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		}
	}
};

export default resolvers;
