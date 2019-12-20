import { takeLatest, put } from 'redux-saga/effects';
import { fetchAllFoodSuccessAction, fetchAllOrdersSuccessAction } from './../actions';
import { all } from 'redux-saga/effects';

import Service from './../../services'


export function* fetchAllFoodWatcher() {
    yield takeLatest('FETCH_ALL_FOOD', fetchAllFoodSaga);
}

export function* fetchAllFoodSaga() {
    try {
        const allFood = yield Service.getFoodService();
        console.log('allfoodsaga', allFood);
        yield put(fetchAllFoodSuccessAction(allFood));
    } catch (error) {
        
    }
}

export function* fetchAllOrdersWatcher() {
    yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrdersSaga);
}

export function* fetchAllOrdersSaga() {
    try {
        const allOrders = yield Service.getAllOrdersService();
        console.log('allOrderssaga', allOrders);
        yield put(fetchAllOrdersSuccessAction(allOrders));
    } catch (error) {
        
    }
}



export default function* rootSaga() {
    yield all([
        fetchAllFoodWatcher(),
        fetchAllFoodSaga(),
        fetchAllOrdersWatcher(),
        fetchAllOrdersSaga(),
    ]);
}