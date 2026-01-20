export const login = (username, password) => {
  if (username === "admin@example.com" && password === "password123") {
    localStorage.setItem("auth", JSON.stringify({ username }));
    return true;
  }
  return false;
};

export const logOut = () => {
  localStorage.removeItem("auth");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("auth");
};
