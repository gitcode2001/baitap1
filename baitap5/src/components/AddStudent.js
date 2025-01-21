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
                const classData = await getAllClasses();
                console.log("Fetched classes:", classData);
                setClasses(classData);

        };
        fetchClasses();
    }, []);

    const initialValues = {
        name: "",
        age: "",
        grade: "",
        classId: "",
        address: ""
    };

    const validationSchema = yup.object({
        name: yup.string().required("Tên là bắt buộc"),
        age: yup.number().required("Tuổi là bắt buộc").min(18, "Tuổi phải ít nhất là 18"),
        grade: yup.string().required("Giới tính là bắt buộc"),
        classId: yup.string().required("Lớp là bắt buộc"),
        address: yup.string().required("Địa chỉ là bắt buộc")
    });

    const handleSubmit = async (values) => {
        try {
            const selectedClass = classes.find(cls => cls.id === values.classId);
            const studentData = {
                ...values,
                class: selectedClass || { id: "", nameClass: "" }
            };
            await addStudent(studentData);
            navigate("/");
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
        <div>
            <h1>Thêm Học Sinh</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div>
                        <label htmlFor="name">Tên:</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="age">Tuổi:</label>
                        <Field type="number" id="age" name="age" />
                        <ErrorMessage name="age" component="div" />
                    </div>
                    <div>
                        <label htmlFor="grade">Giới Tính:</label>
                        <Field type="text" id="grade" name="grade" />
                        <ErrorMessage name="grade" component="div" />
                    </div>
                    <div>
                        <label htmlFor="classId">Lớp:</label>
                        <Field as="select" id="classId" name="classId">
                            <option value="">Chọn lớp</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.nameClass}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="classId" component="div" />
                    </div>
                    <div>
                        <label htmlFor="address">Địa chỉ:</label>
                        <Field type="text" id="address" name="address" />
                        <ErrorMessage name="address" component="div" />
                    </div>
                    <button type="submit">Thêm</button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddStudent;