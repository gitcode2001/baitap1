import axios from 'axios';
import {toast} from "react-toastify";

const BASE_URL = 'http://localhost:3000/students';
const BASE_CLASS_URL = 'http://localhost:3000/classes';
export const getAllStudents = async () => {
  try {
      const response = await axios.get(BASE_URL);
      toast.success("lấy danh sách học sinh thành công");
      return response.data;
  }catch (error) {
      console.error('Lỗi khi lấy danh sách học sinh:', error);
      throw error;
  }
}

export const addStudent = async (student) => {
    try {
        const response = await axios.post(BASE_URL, student);
        toast.success("Thêm học sinh thành công");
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm học sinh:', error);
        throw error;
    }
}