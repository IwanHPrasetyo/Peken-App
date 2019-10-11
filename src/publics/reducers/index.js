import { combineReducers } from "redux";

import productList from "./products";

const rootReducer = combineReducers({
  productList //Global state
});

export default rootReducer;
