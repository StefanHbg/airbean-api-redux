let initialState = {
    products: []
}

const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCTS':
            return {
                products: [...state.products, action.payload]
            }
        default:
            return state;
    }
}

export default menuReducer;