import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import koaBody from 'koa-bodyparser';
import koaCors from '@koa/cors';

import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import graphQLSchema from './graphQLSchema';

import { formatErr } from './utilities';

var jwt = require('jsonwebtoken')

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	console.log("");
	console.log(ctx);
	console.log("");
	/*const dir1 = "http://localhost:5000/";
	const dir2 = "http://localhost:5000/catalog/";
	const dir3 = ctx.header.referer.match("http://localhost:5000/catalog/");
	const dir4 = "http://localhost:5000/login";
	if (ctx.header.referer == dir1 || dir2 == dir3 || ctx.header.referer == dir4){
		await next();
	}
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9\S\/\-\_\.]+)/);
		if (token && token[1]) {
			console.log(token);
			jwt.verify(token[1], 'Secret Password', async function(err, decoded) {
				if (err){
					console.log(err);
					return "No valid token";
				}
				else
					await next();
			});
		}
	}
	if(ctx.method == "GET")
		await next();
	*/await next();
	
});

// GraphQL
const graphql = graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql);
router.get('/graphql', graphql);

// test route
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
