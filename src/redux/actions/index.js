
export const fetchAllFoodAction = () => ({
    type: 'FETCH_ALL_FOOD'
});

export const fetchAllFoodSuccessAction = (allFood) => ({
    type: 'FETCH_ALL_FOOD_SUCCESS',
    allFood,
});