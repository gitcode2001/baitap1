import React from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";
import {addBlog} from "../service/BlogPostService";

const AddBlog = () => {
    const navigate = useNavigate();

    const initial = {
        title: '',
        category: '',
        content: '',
        author: '',
        author_email: '',
    };

    const validation = yup.object({
        title: yup.string().required('Tiêu đề là bắt buộc'),
        category: yup.string().required('Thể loại là bắt buộc'),
        content: yup.string().required('Nội dung là bắt buộc'),
        author: yup.string().required('Tác giả là bắt buộc'),
        author_email: yup.string().email('Định dạng email không hợp lệ').required('Email là bắt buộc'),
    });

    const handleSubmit = async (values) => {
        const slug = values.title.toLowerCase().replace(/\s+/g, '-');
        const updatedAt = new Date().toISOString();

        try {
            await addBlog({ ...values, slug, updatedAt });
            navigate('/posts');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Thêm Blog</h1>
            <Formik initialValues={initial} validationSchema={validation} onSubmit={handleSubmit}>
                <Form>
                    <div>
                        <label htmlFor="title">Tiêu đề:</label>
                        <Field type="text" id="title" name="title" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="category">Thể loại:</label>
                        <Field type="text" id="category" name="category" />
                        <ErrorMessage name="category" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="content">Nội dung:</label>
                        <Field as="textarea" id="content" name="content" />
                        <ErrorMessage name="content" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="author">Tác giả:</label>
                        <Field type="text" id="author" name="author" />
                        <ErrorMessage name="author" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="author_email">Email Tác giả:</label>
                        <Field type="email" id="author_email" name="author_email" />
                        <ErrorMessage name="author_email" component="div" className="error" />
                    </div>
                    <div>
                        <button type="submit">Thêm Blog</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddBlog;