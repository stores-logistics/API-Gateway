import { generalRequest } from '../utilities';
import { url, port, entryPoint } from './server';
var jwt = require('jsonwebtoken')
const URL = `http://${url}:${port}/${entryPoint}`;

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
	var dec = decipher.update(text,'hex','utf8')
	dec += decipher.final('utf8');
	return dec;
}

const resolvers = {
	Query: {
	},
	Mutation: {
		login: async (_, { credentials }) =>{
			//let pass = decrypt(credentials.password);
			//credentials.password = pass;
			try{
				let res = await	generalRequest(`${URL}`, 'POST', credentials)
				if(res){
					console.log("\nuser: ",res, "\n");
					const payload = {
						username: res.username,
						role: res.type,
						code: res.code,
						storeId: res.storeId
					};
					
					var token = await jwt.sign(payload, 'Secret Password', {expiresIn: "1h"})
					return token			
				}else{
					return -1
				}
			}catch(err){
				console.log(err)
			}			
		}			
	}
};

export default resolvers;
