import axios from "axios";

const API_URL = "http://localhost:8080/api/";

export const getList = async (option: string) => {
    return await axios.get(`${API_URL}/${option}`);
};