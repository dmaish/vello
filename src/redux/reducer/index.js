
const initialState = {
    allFood: [],
    allOrders: [],
}

const foodReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_ALL_FOOD_SUCCESS':
            return {...state, allFood: action.allFood}
        case 'FETCH_ALL_ORDERS_SUCCESS':
            return {...state, allOrders: action.allOrders}

        default:
            return state;

    }
}


export default foodReducer;