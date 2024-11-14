import axiosInstance from "../axios";
import axiosMultiPart from "../axios/multi-part";

export const getMaterials = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/material/all`
      );
      resolve(response);
    } catch (error) {
      reject({ message: error });
    }
  });
};

export const changePhotoHandler = async (image) => {
  try {
    const response = await axiosMultiPart.post(
      `${process.env.NEXT_PUBLIC_APP_PYTHON_BACKEND_URL}`,
      image
    );
    return response.data;
  } catch (error) {
    console.error("Failed to change photo:", error);
    throw error;
  }
};

export const getThickness = async (materialId) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/thickness?materialId=${materialId}`
    );
    return response;
  } catch (error) {
    console.error("Failed to fetch thickness:", error);
    throw error;
  }
};

export const addQuote = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/quote`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add quote:", error);
    throw error;
  }
};

export const addCart = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/add`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add cart:", error);
    throw error;
  }
};

export const getCart = async (data) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/all`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
};

export const increaseCartItems = async (item) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/update`,
      item
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error;
  }
};

export const decreaseCartItems = async (item) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/update`,
      item
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/cart/delete/${id}`,
      id
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error;
  }
};

export const getRigidFileLink = (file) => {
  let payload = {};
  payload.image = file;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosMultiPart.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/user/uploadRigidFile`,
        payload
      );
      resolve(response);
    } catch (error) {
      reject({ error });
    }
  });
};
export const uploadGalleyImage = (file) => {
  let payload = {};
  payload.file = file;
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosMultiPart.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/user/uploadRigidImage`,
        payload
      );
      resolve(response);
    } catch (error) {
      reject({ error });
    }
  });
};

export const getColorOfmaterial = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/color?materialId=${id}`
      );
      resolve(response);
    } catch (error) {
      reject({ error });
    }
  });
};
export const getFinishOfMaterial = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/finish?materialId=${id}`
      );
      resolve(response);
    } catch (error) {
      reject({ error });
    }
  });
};
