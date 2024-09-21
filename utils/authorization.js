import { getCookie } from "./cookie.js";

const authorization = () => {
  const cookie = getCookie();
  const url = location.href;
  if (
    (cookie && url.includes("login")) ||
    (!cookie && url.includes("dashboard"))
  ) {
    location.assign("home.html");
  }
};

export default authorization;
