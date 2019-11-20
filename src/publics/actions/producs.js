import axios from "axios";

export const getAll = async limit => {
  const result = await axios.get(
    `https://pekenbackend.herokuapp.com/public/images/carrot-icon.jpeg/products?limit=${limit}`
  );
  return {
    type: "GET_PRODUCT_FULFILLED",
    payload: result.data
  };
};
