import axiosInstance from "../axios";
import axiosMultiPart from "../axios/multi-part";

export const getCities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/address/get-cities`
      );
      resolve(response);
    } catch (error) {
      reject({ message: error });
    }
  });
};
export const getArea = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/address/get-district/${id}`
        );
        resolve(response);
      } catch (error) {
        reject({ message: error });
      }
    });
  };

  export const getShippingCharges = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/percentages/district-shipping-charge`, payload
        );
        resolve(response);
      } catch (error) {
        reject({ message: error });
      }
    });
  };