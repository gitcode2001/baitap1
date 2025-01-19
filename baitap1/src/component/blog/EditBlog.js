import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getBlogById, updateBlog} from "../service/BlogPostService";

const EditBlog = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        category: '',
        content: '',
        author: '',
        author_email: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogData = await getBlogById(id);
                setBlog(blogData);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBlog({...blog, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blog.title || !blog.category || !blog.content || !blog.author || !blog.author_email) {
            return;
        }

        const slug = blog.title.toLowerCase().replace(/\s+/g, '-');
        const updatedAt = new Date().toISOString();

        await updateBlog({...blog, slug, updatedAt});
        navigate('/posts');

    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="container">
            <h2>Chỉnh sửa Blog</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Tiêu đề</label>
                    <input type="text" className="form-control" id="title" name="title" value={blog.title}
                           onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Thể loại</label>
                    <input type="text" className="form-control" id="category" name="category" value={blog.category}
                           onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Nội dung</label>
                    <textarea className="form-control" id="content" name="content" value={blog.content}
                              onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Tác giả</label>
                    <input type="text" className="form-control" id="author" name="author" value={blog.author}
                           onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author_email">Email Tác giả</label>
                    <input type="email" className="form-control" id="author_email" name="author_email"
                           value={blog.author_email} onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
};

export default EditBlog;