
const initialState = {
    allFood: [],
}

const foodReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_ALL_FOOD_SUCCESS':
            return {...state, allFood: action.allFood}

        default:
            return state;

    }
}

export default foodReducer;