import axiosInstance from "../axios";
import axiosMultiPart from "../axios/multi-part";

export const handleSubmitContact = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/address/contact-us`, values
      );
      resolve(response);
    } catch (error) {
      reject({error });
    }
  });
};