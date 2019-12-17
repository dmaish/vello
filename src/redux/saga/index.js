import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchAllFoodSuccessAction } from './../actions';
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

export default function* rootSaga() {
    yield all([
        fetchAllFoodWatcher(),
        fetchAllFoodSaga(),
    ]);
}