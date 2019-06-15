//Algunas librerias para conectar el front con graphql: https://graphql.org/code/#javascript-1

//----------------------------------------------------------

// Graphql Products

const createProduct = `mutation{
  createProduct(product: {
    name: "Cepillo 2"
    description: "Un cepillo de dientes"
    type: "Aseo 2"
    image: "asddsa"
    storeId: 2
    quantity: 2
    cost: 2.1
  }) {
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`

`query{
  allProducts{
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`

`query{
  productByCode(_id: "5cf47953ecf33a00227e1b1c")
  {
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`

`query{
  productsByName(name: "Cepillo de dientes")
  {
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`

`query{
  productsByType(type: "Aseo dental")
  {
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`

`query{
  productsByStore(storeId: 1)
  {
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`

`mutation{
  deleteProduct(_id: "5cf46bfe2c54040022a815cc")
}`

`mutation{
  updateProduct(_id: "5cf46bfe2c54040022a815cc", product: {
    name: "Cepillo editado"
    description: "Un cepillo de dientes editado"
    type: "Aseo 2 editado"
    image: "asddsa"
    storeId: 2
    quantity: 20
    cost: 2.8
  }) {
    _id
    name
    description
    type
    image
    storeId
    quantity
    cost
  }
}`
// ----------------------------------------------------------------

// Graphql Users

`mutation{
  createUser(user: {
    name: "Camilo"
    lastName: "Nieto"
    cabin: "2019"
    creditCard: "asdsadasd12312312321"
  }) {
    code
    name
    lastName
    cabin
    creditCard
  }
}`

`query{
  allUsers{
    code
    name
    lastName
    cabin
    creditCard
  }
}`

`query{
  userByCode(code: 3){
    code
    name
    lastName
    cabin
    creditCard
  }
}`

`mutation{
  updateUser(code: 1, user: {
    name: "Camilo Esteban"
    lastName: "Nieto Barrera"
    cabin: "201"
    creditCard: "217839012jksad"
  }) {
    code
    name
    lastName
    cabin
    creditCard
  }
}`

`mutation{
  deleteUser(code: 5)
  {
    code
    name
    lastName
    cabin
    creditCard
  }
}`

// --------------------------------------

// Graphql Stores

`mutation{
  createStore(store: {
    name: "La Roche-Posay"
    type: "Salud & belleza"
    owner: "Stefano La Roche"
    ubication: "P4-L16"
    dates: "L-V 9:00-17:00"
    description: "Todo en el cuidado para la piel de la familia."
    img: "https://cdn.joinhoney.com/images/lp/store-logos/laroche-posay-logo.png"
  }) {
    code
    name
    type
    owner
    ubication
    dates
    description
    img
  }
}`

`query{
  allStores{
    code
    name
    type
    owner
    ubication
    dates
    description
    img
  }
}`

`query{
  storeByCode(id: 1)
  {
    code
    name
    type
    owner
    ubication
    dates
    description
    img
  }
}`

`mutation{
  deleteStore(id: 1)
}`

`mutation{
  updateStore(id: 2, store: {
    name: "Tienda 1 editada"
    type: "Cosmeticos"
    owner: "Jorge 1"
    ubication: "2ndo piso"
    dates: "2012-03-20"
  }) {
    id
    name
    type
    owner
    ubication
    dates
  }
}`

// --------------------------------------

// Graphql Tradings

`mutation{
  createTrading(trading: {
    timestamp: "2012-03-20"
    store_id: 1
    user_id: 2
    product_id: "12ujashd1221dssadsa"
    price: 12.2
  }) {
    _id
    timestamp
    store_id
    user_id
    product_id
    price
  }
}`

`query{
  allTradings{
    _id
    timestamp
    store_id
    user_id
    product_id
    price
  }
}`

`query{
  tradingByCode(_id: "5cf55a7f59503f00223d46ee")
  {
    _id
    timestamp
    store_id
    user_id
    product_id
    price
  }
}`

`query{
  tradingsByStoreId(store_id: 2)
  {
    _id
    timestamp
    store_id
    user_id
    product_id
    price
  }
}`

`query{
  tradingsByUserId(user_id: 2)
  {
    _id
    timestamp
    store_id
    user_id
    product_id
    price
  }
}`

`mutation{
  deleteTrading(_id: "5cf55a7f59503f00223d46ee")
}`

`mutation{
  updateTrading(_id: "5cf55ad659503f00223d46ef", trading: {
    timestamp: "2012-03-21"
    store_id: 1
    user_id: 1
    product_id: "12ujashdsad121221dssadsa"
    price: 21.1
  }) {
    _id
    timestamp
    store_id
    user_id
    product_id
    price
  }
}`

// --------------------------------------
