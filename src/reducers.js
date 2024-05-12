import {combineReducers} from 'redux';

import  {PRODUCT_ADD, PRODUCT_ADD_ALL, PRODUCT_DELETE, PRODUCT_UPDATE} from './actions';


function actions(state = [], action) {
    switch (action.type) {
        case PRODUCT_ADD:
            return [
                ...state, 
                {
                    _id: action._id, 
                    name: action.name, 
                    description: action.description, 
                    price: action.price
                }
            ]
        case PRODUCT_ADD_ALL:
            return [
                ...action.product_list
            ]
        case PRODUCT_DELETE:
            return state.filter(function(product) {
                return product._id !== action._id;       
            })
        case PRODUCT_UPDATE:
            return state.map(function(product) {
                if (product._id === action._id) {
                    return {
                        ...product,
                        name: action.name,
                        description: action.description,
                        price: action.price
                    }
                }
                return product;
        })
        default:
            return state
    }
}

export default combineReducers({
    products: actions
})