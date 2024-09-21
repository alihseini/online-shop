import { postData } from "../utils/httpreq.js";
import { setCookie } from "../utils/cookie.js";
import authorization from "../utils/authorization.js";
import validateForm from "../utils/validation.js";
import { closeModal } from "../utils/modal.js";

const inputs = document.querySelectorAll("input");
const loginButton = document.querySelector("button");
const modalButton = document.getElementById("modal-button");

const loginHandler = async (event) => {
  event.preventDefault();
  const userData = {
    username: inputs[0].value,
    password: inputs[1].value,
  };
  const validation = validateForm(userData.username, userData.password);
  if (!validation) return;
  const result = await postData("auth/login", userData);
  setCookie(result.token);
  location.assign("home.html");
};

loginButton.addEventListener("click", loginHandler);
modalButton.addEventListener("click", closeModal);
window.addEventListener("DOMContentLoaded", authorization);
