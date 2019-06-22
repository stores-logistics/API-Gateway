import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';
import auth from '../rbacSchema';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allProducts: (parent, args, ctx, info) => {
			const request = getRequest(URL, '');
			return auth(request, ctx.header, info.fieldName);
		},
		productByCode: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args._id}`, 'GET');
			return auth(request, ctx.header, info.fieldName);
		},
		productsByName: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/name/${args.name}`, 'GET');
			return auth(request, ctx.header, info.fieldName); 
		},
		productsByType: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/type/${args.type}`, 'GET');
			return auth(request, ctx.header, info.fieldName); 
		},
		productsByStore: (parent, args, ctx, info) => {
			return generalRequest(`${URL}/store/${args.storeId}`, 'GET');
			//const request = generalRequest(`${URL}/store/${args.storeId}`, 'GET');
			//return auth(request, ctx.header, info.fieldName); 
		}
	},
	Mutation: {
		createProduct: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}`, 'POST', args.product);
			return auth(request, ctx.header, info.fieldName);
		},
		updateProduct: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args._id}`, 'PATCH', args.product);
			return auth(request, ctx.header, info.fieldName);
		},
		deleteProduct: (parent, args, ctx, info) => {
			const request = generalRequest(`${URL}/${args._id}`, 'DELETE');
			return auth(request, ctx.header, info.fieldName);
		}
	}
};

export default resolvers;