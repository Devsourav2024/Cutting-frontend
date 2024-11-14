// import axiosInstance from "@/lib/axios";
// import axiosFormData from "@/lib/axiosFormData";
// import storageInstance from "@/utils/storageInstance";

import axiosInstance from "../axios";
import axiosMultiPart from "../axios/multi-part";

// Example: Get user by ID
/* export const getUserById = async (userId) => {
    try {
      const response = await apiClient.get(/users/${userId});
      return response.data; // Return the data from the response
    } catch (error) {
      // Handle error appropriately
      console.error('Failed to fetch user:', error);
      throw error; // Optionally rethrow the error for further handling
    }
  };
   */
// Example: Create a new user
export const createUser = async (userData) => {
  try {
    console.log("ABC 123");
    console.log("axioos===", axiosInstance);

    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/signup`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

// Example: Login user
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/login`,
      userData
    );
    console.log("response API login==>", response);

    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

export const handleSocialLogin = async (payload) => {
  try {

    let response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/social-login`,
      payload
      // {
      //   headers: {
      //     "Content-Type": "application/json", // or any other header needed
      //     // Authorization: `Bearer ${yourToken}`, // if you need authorization
      //     // Add any other custom headers if necessary
      //   },
      // }
    );
    console.log("response API login==>", response);

    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

/* export const handleSocialLogin = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/user/social-login`,
        payload
      );
      // console.log("response API social==>", response);
      localStorage.setItem("token", response.token);
      return response.data;

      resolve(response);
    } catch (error) {
      reject({ message: error });
    }
  });
}; */

export const getProfile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/user/profile`
      );
      resolve(response);
    } catch (error) {
      reject({ message: error });
    }
  });
};

export const getOrderItems = (order_item_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/item/${order_item_id}`
      );
      resolve(response);
    } catch (error) {
      reject({ message: error });
    }
  });
};

export const getOrderDetailsByUserId = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/order/items/${user_id}`
      );
      resolve(response);
    } catch (error) {
      reject({ message: error });
    }
  });
};

export const updateUserDetails = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/update`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const addAddress = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/address/add`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add address:", error);
    throw error;
  }
};

export const updateAddress = async (address) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/address/update`,
      address
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update address:", error);
    throw error;
  }
};

export const cancelOrder = async (order_id) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/order/cancel/${order_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update address:", error);
    throw error;
  }
};

export const updateBillingAddress = async (address) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/update/billing-address`,
      address
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update billing:", error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/address/delete/${id}`,
      id
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete address:", error);
    throw error;
  }
};

export const changePasswordHandler = async (password) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/change-password`,
      password
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete address:", error);
    throw error;
  }
};

export const changeImageHandler = async (image) => {
  try {
    const response = await axiosMultiPart.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/updateProfilePicture`,
      image
    );
    return response.data;
  } catch (error) {
    console.error("Failed to change image:", error);
    throw error;
  }
};
