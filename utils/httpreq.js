import { showModal } from "./modal.js";

const BASE_URL = "https://fakestoreapi.com/";

const postData = async (path, userData) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    showModal("an error occured!");
  }
};
const getData = async (path) => {
  try {
    const response = fetch(`${BASE_URL}${path}`);
    const result = (await response).json();
    return result;
  } catch (error) {
    showModal("an error occured!");
  }
};

export { postData, getData };
