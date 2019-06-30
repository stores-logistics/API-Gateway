import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../security/security';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allTradings: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return getRequest(URL, '');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		tradingByCode: (parent, args, ctx, info) =>{
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args._id}`, 'GET');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		tradingsByStoreId: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/store/${args.store_id}`, 'GET');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		tradingsByUserId: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/user/${args.user_id}`, 'GET');
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		}
	},
	Mutation: {
		createTrading: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}`, 'POST', args.trading);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		updateTrading: (parent, args, ctx, info) => {
			try{
				auth(ctx.header, info.fieldName);
				return generalRequest(`${URL}/${args._id}`, 'PUT', args.trading);
			} catch(e){
				console.log("Failed autenticating");
				return e;
			}
		},
		deleteTrading: (parent, args, ctx, info) => {
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
