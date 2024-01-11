export const storeToken = (token, rememberMe) => {
  //   console.log("Store toke", token);
  if (rememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  //   console.log("Get Token", token);
  if (token) {
    return token;
  } else {
    return sessionStorage.getItem("token");
  }
};
