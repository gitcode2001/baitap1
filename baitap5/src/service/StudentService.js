import axios from 'axios';
import { toast } from "react-toastify";

const BASE_URL = 'http://localhost:3000/students';

export const getAllStudents = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
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

export const updateStudent = async (student) => {
    try {
        const response = await axios.put(`${BASE_URL}/${student.id}`, student);
        toast.success("Cập nhật học sinh thành công");
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật học sinh:', error);
        throw error;
    }
}

export const deleteStudent = async (id) => {
    try {
        const studentResponse = await axios.get(`${BASE_URL}/${id}`);
        const studentName = studentResponse.data.name;
        await axios.delete(`${BASE_URL}/${id}`);
        toast.success(`Xóa học sinh ${studentName} thành công`);
    } catch (error) {
        toast.error('Lỗi khi xóa học sinh:', error);
        throw error;
    }
}

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin học sinh:', error);
        throw error;
    }
}
export const detailStudent = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết học sinh:', error);
        throw error;
    }
}
export const searchStudent = async (name, classId) => {
    try {
        const params = {};
        if (name) {
            params.name_like = name;
        }
        if (classId) {
            params.classId = classId;
        }

        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tìm kiếm học sinh:', error);
        throw error;
    }
}

