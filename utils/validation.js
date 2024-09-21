const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const validateUsername = (userName) => {
  const regex = /^[a-zA-z\d_]{4,16}$/;
  return regex.test(userName);
};

const validatePassword = (password) => {
  const regex = /^.{5,20}$/;
  return regex.test(password);
};

const validateForm = (userName, password) => {
  const userNameResult = validateUsername(userName);
  const passwordResult = validatePassword(password);
  if (userNameResult && passwordResult) {
    return true;
  } else if (!userNameResult) {
    showError(usernameError,"- username should be only letters and numbers and underline between 4 and 16 characters!")
  } else if (!passwordResult) {
    showError(passwordError,"- password should be between 5 and 20 characters!");
  }
};

const showError = (errorTag, message) => {
  errorTag.style.display="block"
  errorTag.innerText=""
  errorTag.innerText = message;
};

export default validateForm;
