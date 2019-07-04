import {rbacSchema} from './rbacSchema';
const jwt = require('jsonwebtoken');

export default function AuthRbac(header, method){
    //console.log("header auth: ", header);
    //console.log("method: ", method);
    const {role} = isValidToken(header);
    isValidRole(role, method);
}

function isValidToken(header){
	//console.log("header is valid token: ", header);
    if (header.authorization) {
		const token = header.authorization.match(/Bearer ([A-Za-z0-9\S\/\-\_\.]+)/);
		if (token && token[1]) {
            try{
                const decoded = jwt.verify(token[1], 'Secret Password');
                return decoded;
            } catch(ex){
                console.log(ex);
                throw -2;
            }
		}
    }   
};

function isValidRole(role, method){
    if (!rbacSchema[method][role]){
        console.log("Is not a valid role");
        throw -1;
    }
};

/*
function AuthRbacWithAtrribConstrain(request, header, method, constrains){
    try {
        const payload = isValidToken(header);
        isValidRole(payload.role, method);
        validateConstrains(constrains);
        return request;
    }catch(ex){
        return ex;
    }
}

function validateConstrains(constrains, user){
    Object.entries(constrains).forEach(([key, value]) => {
        if(user[key] !== value)
            throw "You have no permission to perform de action " + key + " over " + value;
    });
};
*/