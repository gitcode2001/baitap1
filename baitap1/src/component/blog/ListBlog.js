import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { deleteBlog, getAllBlogs, searchBlogsByTitle } from "../service/BlogPostService";

function ListBlog() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const response = await getAllBlogs();
        setBlogs(response);
        setFilteredBlogs(response);
    };

 const handleSearchChange = async (e) => {
    const title = e.target.value;
    setSearchTitle(title);

    if (title) {
        try {
            const filtered = await searchBlogsByTitle(title);
            console.log('Filtered blogs:', filtered);
            setFilteredBlogs(filtered);
        } catch (error) {
            console.error('Error during search:', error);
        }
    } else {
        setFilteredBlogs(blogs);
    }
};

    const handleShow = (blog) => {
        setSelectedBlog(blog);
        setShowDeleteModal(true);
    };

    const handleClose = () => setShowDeleteModal(false);

    const handleDeleteConfirm = async () => {
        if (!selectedBlog) return;
        await deleteBlog(selectedBlog.id);
        setShowDeleteModal(false);
        await fetchBlogs();
    };

    return (
        <div className="container">
            <h3>Danh sách Blog</h3>
            <Link to="/posts/add" className="btn btn-success mb-3">Thêm Blog Mới</Link>
            <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề"
                value={searchTitle}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Thể loại</th>
                        <th>Ngày</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBlogs.map((blog, index) => (
                        <tr key={blog.id}>
                            <td>{index + 1}</td>
                            <td>{blog.title}</td>
                            <td>{blog.category}</td>
                            <td>{new Date(blog.updatedAt).toLocaleString()}</td>
                            <td>
                                <Link to={`/posts/detail/${blog.id}`} className="btn btn-info btn-sm">Xem</Link>{' '}
                                <Link to={`/posts/edit/${blog.id}`} className="btn btn-warning btn-sm">Sửa</Link>{' '}
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleShow(blog)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa blog có tiêu đề {selectedBlog?.title} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListBlog;