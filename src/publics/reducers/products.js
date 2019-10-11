const initialState = {
  productsList: [],
  errMessage: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};
const products = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "GET_PRODUCT_FULFILLED":
      // console.log(payload.data);
      // console.log(payload.page);
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        productsList: payload.data
      };
    default:
      return state;
  }
};

export default products;
