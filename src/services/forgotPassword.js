import axiosInstance from "../axios";
import axiosMultiPart from "../axios/multi-part";

export const sendForgotEmail = (email) => {
    let payload = {};
    payload.email = email;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/user/forgot-password`, payload
      );
      resolve(response);
    } catch (error) {
      reject({error });
    }
  });
};
export const sendForgotPassword = (password, token) => {
    let payload = {};
    payload.password = password;
    payload.token = token;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/user/change-password-update`, payload
      );
      resolve(response);
    } catch (error) {
      reject({error });
    }
  });
};
