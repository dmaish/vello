
export const fetchAllFoodAction = () => ({
    type: 'FETCH_ALL_FOOD'
});

export const fetchAllFoodSuccessAction = (allFood) => ({
    type: 'FETCH_ALL_FOOD_SUCCESS',
    allFood,
});

export const fetchAllOrdersAction = () => ({
    type: 'FETCH_ALL_ORDERS'
});

export const fetchAllOrdersSuccessAction = (allOrders) => ({
    type: 'FETCH_ALL_ORDERS_SUCCESS',
    allOrders,
});