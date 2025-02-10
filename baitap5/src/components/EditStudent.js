import React, { useEffect, useState } from 'react';
import { getStudentById, updateStudent } from "../service/StudentService";
import { useNavigate, useParams } from 'react-router-dom';
import { getAllClasses } from "../service/ClassService";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditStudent = () => {
    const [classOptions, setClassOptions] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchStudent = async () => {
            const studentData = await getStudentById(id);
            setStudent(studentData);
        };
        fetchStudent();

        const fetchClasses = async () => {
            const classesData = await getAllClasses();
            setClassOptions(classesData);
        };
        fetchClasses();
    }, [id]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Tên không được để trống'),
        age: Yup.number().required('Tuổi không được để trống').positive('Tuổi phải là số dương').integer('Tuổi phải là số nguyên'),
        address: Yup.string().required('Địa chỉ không được để trống'),
        classId: Yup.string().required('Lớp không được để trống'),
        gender: Yup.string().required('Giới tính không được để trống')
    });

    const handleSubmit = async (values) => {
        await updateStudent(values);
        navigate('/');
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">Chỉnh sửa học sinh</h2>
                    <Formik
                        initialValues={{
                            id: '',
                            name: '',
                            age: '',
                            address: '',
                            classId: '',
                            gender: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="name" className="form-label">Tên</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Tên"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="gender" className="form-label">Giới tính</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="gender"
                                            name="gender"
                                            placeholder="Giới tính"
                                        />
                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Tuổi</label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        placeholder="Tuổi"
                                    />
                                    <ErrorMessage name="age" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        placeholder="Địa chỉ"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="classId" className="form-label">Lớp</label>
                                    <Field
                                        as="select"
                                        className="form-select"
                                        id="classId"
                                        name="classId"
                                    >
                                        <option value="">Chọn lớp</option>
                                        {classOptions.map(cls => (
                                            <option key={cls.classId} value={cls.classId}>
                                                {cls.className}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="classId" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Cập nhật học sinh</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;