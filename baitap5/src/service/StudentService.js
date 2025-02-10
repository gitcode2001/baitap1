import axios from 'axios';

const API_URL = 'http://localhost:8089/students';

export const getAllStudents = async (page, size) => {
    try {
        const response = await axios.get(API_URL, { params: { page, size } });
        return response.data;
    } catch (error) {
        console.error('Error fetching student list:', error);
        throw error;
    }
}

export const addStudent = async (student) => {
    try {
        const response = await axios.post(API_URL, student);
        console.log("Student added successfully");
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
}

export const updateStudent = async (id, student) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, student);
        console.log("Student updated successfully");
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

export const deleteStudent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        console.log("Student deleted successfully");
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

export const getStudentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student information:', error);
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

        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error searching for student:', error);
        throw error;
    }
}

export const detailStudent = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/detail`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student details:', error);
        throw error;
    }
};