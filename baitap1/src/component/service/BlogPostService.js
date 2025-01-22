import axios from 'axios';
import { toast } from "react-toastify";

const BASE_URL = 'http://localhost:3000/post';

export const addBlog = async (blog) => {
  try {
    const response = await axios.post(BASE_URL, blog);
    toast.success('Thêm blog thành công');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm blog:', error);
    throw error;
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách blog:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    toast.success('Lấy blog theo ID thành công');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy blog theo ID:', error);
    throw error;
  }
};

export const updateBlog = async (blog) => {
  try {
    const response = await axios.put(`${BASE_URL}/${blog.id}`, blog);
    toast.success('Cập nhật blog thành công');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật blog:', error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    toast.success('Xóa blog thành công');
  } catch (error) {
    console.error('Lỗi khi xóa blog:', error);
    throw error;
  }
};
