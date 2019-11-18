import axios from "axios";

const api = axios.create({
  baseURL: "http://ddragon.leagueoflegends.com/cdn/9.22.1"
});

export default api;
