function AuthRbacWithAtrribConstrain(request, header, method, constrains){
    try {
        const payload = isValidToken(header);
        isValidRole(payload.type, method);
        validateConstrains(constrains);
        return request;
    }catch(ex){
        return ex;
    }
}

export default function AuthRbac(request, header, method){
    try {
        const {type} = isValidToken(header);
        isValidRole(type, method);
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

function isValidToken(header){
    if (header.authorization) {
		const token = header.authorization.match(/Bearer ([A-Za-z0-9\S\/\-\_\.]+)/);
		if (token && token[1]) {
            try{
                const decoded = jwt.verify(token[1], 'Secret Password');
                return decoded;
            } catch(ex){
                throw ex;
            }
		}
    }   
};

function isValidRole(role, method){
    if (!rbac[method][role])
        throw "Yo are not authorized to do that operation.";
};

const rbac = {
    login: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },

    allProducts: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productsByName: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productsByType: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    productsByStore: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createProduct: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    deleteProduct: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    updateProduct: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },

    allStores: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    storeByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createStore: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    deleteStore: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    updateStore: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },

    allTradings: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    tradingByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    tradingsByStoreId: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": false
    },
    tradingsByUserId: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createTrading: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    deleteTrading: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    updateTrading: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },

    allUsers: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    userByCode: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    userByUsername: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    },
    createUser: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    deleteUser: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    updateUser: {
        "Admin": true, 
        "Manager": true, 
        "Passanger": true
    }
};