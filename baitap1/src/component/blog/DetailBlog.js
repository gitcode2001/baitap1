import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getBlogById} from "../service/BlogPostService";

function DetailBlog() {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await getBlogById(id);
            setBlog(response);
        };
        fetchBlog();
    }, [id]);

    return (
        <div>
            <h1>Chi tiết bài viết</h1>
            <div className="card-body">
                <table className="table">
                    <tbody>
                    {blog && <>
                        <tr>
                            <td>ID</td>
                            <td>{blog.id}</td>
                        </tr>
                        <tr>
                            <td>Tiêu đề</td>
                            <td>{blog.title}</td>
                        </tr>
                        <tr>
                            <td>Slug</td>
                            <td>{blog.slug}</td>
                        </tr>
                        <tr>
                            <td>Thể loại</td>
                            <td>{blog.category}</td>
                        </tr>
                        <tr>
                            <td>Nội dung</td>
                            <td>{blog.content}</td>
                        </tr>

                        <tr>
                            <td>Người tạo</td>
                            <td>{blog.author}</td>
                        </tr>
                        <tr>
                            <td>Ngày tạo</td>
                            <td>{new Date(blog.updatedAt).toLocaleString()}</td>
                        </tr>
                    </>
                    }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default DetailBlog;