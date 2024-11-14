import axiosInstance from "../axios";
import axiosMultiPart from "../axios/multi-part";

export const handleReview = (values, id) => {
    let payload = {};
    payload.message = values?.review;
    payload.rating = values?.rating;
    payload.order_item_id = id;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/item/review`, payload
      );
      resolve(response);
    } catch (error) {
      reject({error });
    }
  });
};
