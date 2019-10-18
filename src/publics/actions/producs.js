import axios from "axios";

export const getAll = async limit => {
  const result = await axios.get(
    `http://3.80.248.213:5000/products?limit=${limit}`
  );
  return {
    type: "GET_PRODUCT_FULFILLED",
    payload: result.data
  };
};
