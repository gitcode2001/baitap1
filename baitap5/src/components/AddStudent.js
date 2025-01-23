import React, { useEffect, useState } from "react";
import { addStudent } from "../service/StudentService";
import { getAllClasses } from "../service/ClassService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const AddStudent = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
                const classData = await getAllClasses();
                setClasses(classData);

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
        name: yup.string().required("Tên là bắt buộc").min(8,"ít nhất 8 chữ cái")
            .max(50, "Tên phải từ 8 đến 50 ký tự"),
        age: yup.number().required("Tuổi là bắt buộc").min(18, "Tuổi phải từ 18 trở lên")
            .max(100, "Tuổi phải từ 18 đến 100"),
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
            console.error("Lỗi khi thêm học sinh:", error);
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="text-center mb-4">thêm mới học sinh</h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ handleSubmit }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <label htmlFor="name" className="form-label">Full name</label>
                                    </Col>
                                    <Col md={8}>
                                        <Field type="text" name="name" placeholder="Nhập Họ và Tên" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <label htmlFor="age" className="form-label">Tuổi</label>
                                    </Col>
                                    <Col md={8}>
                                        <Field type="number" name="age" placeholder="Nhập tuổi" className="form-control" />
                                        <ErrorMessage name="age" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <label htmlFor="gender" className="form-label">Giới tính</label>
                                    </Col>
                                    <Col md={8}>
                                        <div role="group" aria-labelledby="gender-group">
                                            <Field type="radio" name="gender" value="Nam" id="male" />
                                            <label htmlFor="male" className="me-3">Nam</label>
                                            <Field type="radio" name="gender" value="Nữ" id="female" />
                                            <label htmlFor="female" className="me-3">Nữ</label>
                                            <Field type="radio" name="gender" value="khác" id="other" />
                                            <label htmlFor="other">Khác</label>
                                        </div>
                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <label htmlFor="classId" className="form-label">Lớp</label>
                                    </Col>
                                    <Col md={8}>
                                        <Field as="select" name="classId" className="form-control">
                                            <option value="">Chọn lớp</option>
                                            {classes.map(cls => (
                                                <option key={cls.classId} value={cls.classId}>
                                                    {cls.className}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="classId" component="div" className="text-danger" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                                    </Col>
                                    <Col md={8}>
                                        <Field type="text" name="address" placeholder="Nhập địa chỉ" className="form-control" />
                                        <ErrorMessage name="address" component="div" className="text-danger" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="text-center">
                                        <Button type="submit" className="btn btn-success">OK</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddStudent;