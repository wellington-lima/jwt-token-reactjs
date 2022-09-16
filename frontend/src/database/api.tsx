import axios from "axios";

const authApi = (token: string | null) => axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { authApi };