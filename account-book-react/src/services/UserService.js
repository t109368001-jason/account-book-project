import api from "../api";

export const login = ({ username = String, password = String }) => {
  return api
    .post(
      "/login",
      { username, password },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    )
    .then(getUser);
};

export const logout = () => {
  return api.get("/logout");
};

export const getUser = () => {
  return api.get("/users");
};
