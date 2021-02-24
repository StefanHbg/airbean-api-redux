const addProducts = (products) => {
    return {
        type: 'ADD_PRODUCTS',
        payload: products
    }
}

export default addProducts