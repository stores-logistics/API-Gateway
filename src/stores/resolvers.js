import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../security/security';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allStores: (parent, args, ctx, info) => {
			return getRequest(URL, '');
		},
		storeByCode: (parent, args, ctx, info) => {
			return generalRequest(`${URL}/${args.code}`, 'GET');
		},
	},
	Mutation: {
		createStore: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}`, 'POST', args.store);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		updateStore: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args.code}`, 'PUT', args.store);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		deleteStore: (parent, args, ctx, info) => {
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
