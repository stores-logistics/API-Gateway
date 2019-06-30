import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../security/security';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return getRequest(URL, '');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		productByCode: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args._id}`, 'GET');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		productsByName: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/name/${args.name}`, 'GET');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		productsByType: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/type/${args.type}`, 'GET');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		productsByStore: (parent, args, ctx, info) => {
			return generalRequest(`${URL}/store/${args.storeId}`, 'GET');
		}
	},
	Mutation: {
		createProduct: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}`, 'POST', args.product);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		updateProduct: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args._id}`, 'PATCH', args.product);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		deleteProduct: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args._id}`, 'DELETE');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		}
	}
};

export default resolvers;