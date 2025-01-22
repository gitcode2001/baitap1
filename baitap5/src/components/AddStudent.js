import React, { useEffect, useState } from "react";
import { addStudent } from "../service/StudentService";
import { getAllClasses } from "../service/ClassService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classData = await getAllClasses();
                console.log("Fetched classes:", classData);
                setClasses(classData);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

    const initialValues = {
        name: "",
        age: "",
        gender: "",
        classes: {
            classId: '',
            className: ''
        },
        address: ""
    };

    const validationSchema = yup.object({
        name: yup.string().required("Tên là bắt buộc"),
        age: yup.number().required("Tuổi là bắt buộc").min(18, "Tuổi phải ít nhất là 18"),
        gender: yup.string().required("Giới tính là bắt buộc"),
        classId: yup.string().required("Lớp là bắt buộc"),
        address: yup.string().required("Địa chỉ là bắt buộc")
    });

    const handleSubmit = async (values) => {
        try {
            const selectedClass = classes.find(cls => cls.classId === values.classId);
            const studentData = {
                ...values,
                classes: {
                    classId: selectedClass?.classId || "",
                    className: selectedClass?.className || ""
                }
            };
            await addStudent(studentData);
            navigate("/");
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="mb-4">Thêm Học Sinh</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Tên:</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Tuổi:</label>
                            <Field type="number" name="age" className="form-control" />
                            <ErrorMessage name="age" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label>Giới Tính:</label>
                            <div role="group" aria-labelledby="gender-group">
                                <Field type="radio" name="gender" value="nam" id="nam" />
                                <label htmlFor="nam" className="me-3">Nam</label>
                                <Field type="radio" name="gender" value="nữ" id="nữ" />
                                <label htmlFor="nu" className="me-3">Nữ</label>
                                <Field type="radio" name="gender" value="other" id="other" />
                                <label htmlFor="other">Khác</label>
                            </div>
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="classId">Lớp:</label>
                            <Field as="select" name="classId" className="form-control">
                                <option value="">Chọn lớp</option>
                                {classes.map(cls => (
                                    <option key={cls.classId} value={cls.classId}>
                                        {cls.className}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="classId" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ:</label>
                            <Field type="text" name="address" className="form-control" />
                            <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Thêm</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddStudent;