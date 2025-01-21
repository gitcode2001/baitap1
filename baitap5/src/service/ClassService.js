import axios from 'axios';
import {toast} from "react-toastify";
const BASE_CLASS_URL = 'http://localhost:3000/classes';

export const getAllClasses = async () =>  {
    try {
        const response = await axios.get(BASE_CLASS_URL);
        return response.data;
    } catch (error) {
        console.error('Lớp khi lấy danh sách lớp:', error);
        throw error;
    }
}
