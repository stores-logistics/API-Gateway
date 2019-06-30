/**
 * Existen varios metodos a los que no se les hace la autenticacion
 * allStores, storeByCode, productsByStore, userByUsername, login
 */

export const rbacSchema = {
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
        "Admin": false, 
        "Manager": true, 
        "Passanger": false
    },
    deleteProduct: {
        "Admin": false, 
        "Manager": true, 
        "Passanger": false
    },
    updateProduct: {
        "Admin": false, 
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
        "Manager": false, 
        "Passanger": false
    },
    tradingByCode: {
        "Admin": true, 
        "Manager": false, 
        "Passanger": false
    },
    tradingsByStoreId: {
        "Admin": false, 
        "Manager": true, 
        "Passanger": false
    },
    tradingsByUserId: {
        "Admin": false, 
        "Manager": false, 
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
        "Manager": false, 
        "Passanger": false
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
