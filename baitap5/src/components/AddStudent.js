import React, {useEffect, useState} from "react";
import {addStudent} from "../service/StudentService";
import {getAllClasses} from "../service/ClassService";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {Container, Row, Col, Button, Card} from "react-bootstrap";

const AddStudent = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        const classData = await getAllClasses();
        setClasses(classData);
    };

    const initialValues = {name: "", age: "", gender: "", classId: "", address: ""};

    const validationSchema = yup.object({
        name: yup.string().required("Tên là bắt buộc").min(8, "Ít nhất 8 chữ cái").max(50, "Tên phải từ 8 đến 50 ký tự"),
        age: yup.number().required("Tuổi là bắt buộc").min(18, "Tuổi phải từ 18 trở lên").max(100, "Tuổi phải từ 18 đến 100"),
        gender: yup.string().required("Giới tính là bắt buộc"),
        classId: yup.string().required("Lớp là bắt buộc"),
        address: yup.string().required("Địa chỉ là bắt buộc")
    });

    const handleSubmit = async (values) => {
        try {
            const selectedClass = classes.find(cls => cls.classId === values.classId);
            const studentData = {
                name: values.name,
                age: values.age,
                gender: values.gender,
                address: values.address,
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
                    <h2 className="text-center mb-4">Thêm Mới Học Sinh</h2>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({handleSubmit, errors, touched}) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <FormRow label="Họ và Tên" name="name" type="text" placeholder="Nhập Họ và Tên"
                                         errors={errors} touched={touched}/>
                                <FormRow label="Tuổi" name="age" type="number" placeholder="Nhập Tuổi" errors={errors}
                                         touched={touched}/>
                                <GenderField errors={errors} touched={touched}/>
                                <ClassSelect classes={classes} errors={errors} touched={touched}/>
                                <FormRow label="Địa Chỉ" name="address" type="text" placeholder="Nhập Địa Chỉ"
                                         errors={errors} touched={touched}/>
                                <Row>
                                    <Col className="text-center">
                                        <Button type="submit" className="btn btn-success">Thêm Học Sinh</Button>
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

const FormRow = ({label, name, type, placeholder, errors, touched}) => (
    <Row className="mb-3">
        <Col md={4}>
            <label htmlFor={name} className="form-label">{label}</label>
        </Col>
        <Col md={8}>
            <Field type={type} name={name} placeholder={placeholder}
                   className={`form-control ${errors[name] && touched[name] ? 'is-invalid' : ''}`}/>
            <ErrorMessage name={name} component="div" className="text-danger"/>
        </Col>
    </Row>
);

const GenderField = ({errors, touched}) => (
    <Row className="mb-3">
        <Col md={4}>
            <label className="form-label">Giới Tính</label>
        </Col>
        <Col md={8}>
            <div role="group" aria-labelledby="gender-group">
                <Field type="radio" name="gender" value="Nam" id="male"
                       className={errors.gender && touched.gender ? 'is-invalid' : ''}/>
                <label htmlFor="male" className="me-3">Nam</label>
                <Field type="radio" name="gender" value="Nữ" id="female"
                       className={errors.gender && touched.gender ? 'is-invalid' : ''}/>
                <label htmlFor="female" className="me-3">Nữ</label>
                <Field type="radio" name="gender" value="Khác" id="other"
                       className={errors.gender && touched.gender ? 'is-invalid' : ''}/>
                <label htmlFor="other">Khác</label>
            </div>
            <ErrorMessage name="gender" component="div" className="text-danger"/>
        </Col>
    </Row>
);

const ClassSelect = ({classes, errors, touched}) => (
    <Row className="mb-3">
        <Col md={4}>
            <label htmlFor="classId" className="form-label">Lớp</label>
        </Col>
        <Col md={8}>
            <Field as="select" name="classId"
                   className={`form-control ${errors.classId && touched.classId ? 'is-invalid' : ''}`}>
                <option value="">Chọn Lớp</option>
                {classes.map(cls => (
                    <option key={cls.classId} value={cls.classId}>
                        {cls.className}
                    </option>
                ))}
            </Field>
            <ErrorMessage name="classId" component="div" className="text-danger"/>
        </Col>
    </Row>
);

export default AddStudent;