import React, { useState, useEffect } from 'react';
import { deleteStudent, searchStudent } from "../service/StudentService";
import { getAllClasses } from "../service/ClassService";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function ListStudent() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await searchStudent(searchName, selectedClass);
            setStudents(Array.isArray(response) ? response : []);
            toast.success('Danh sách học sinh đã được tải lại');
            const selectedClassName = selectedClass ? classes.find(c => c.id === parseInt(selectedClass))?.className : 'tất cả';
            toast.info(`Đã chọn lớp: ${selectedClassName}`);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Lỗi khi tải danh sách học sinh');
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await getAllClasses();
            setClasses(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error fetching classes:', error);
            toast.error('Lỗi khi tải danh sách lớp');
        }
    };

    const handleShow = (student) => {
        setShowDeleteModal(true);
        setSelectedStudent(student);
    };

    const handleClose = () => setShowDeleteModal(false);

    const handleDeleteConfirm = async () => {
        if (!selectedStudent) return;
        try {
            await deleteStudent(selectedStudent.id);
            setShowDeleteModal(false);
            await fetchStudents();
            toast.success('Xóa học sinh thành công');
        } catch (error) {
            console.error('Error deleting student:', error);
            toast.error('Lỗi khi xóa học sinh');
        }
    };

    return (
        <div>
            <h1>Danh sách học sinh</h1>
            <Form>
                <Form.Group controlId="searchName">
                    <Form.Label>Tìm kiếm theo tên</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên học sinh"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="selectedClass">
                    <Form.Label>Lọc theo lớp</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Tất cả các lớp</option>
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.className}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={fetchStudents}>
                    Tìm kiếm
                </Button>
            </Form>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Tuổi</th>
                        <th>Giới Tính</th>
                        <th>Lớp</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.classes?.className || 'N/A'}</td>
                            <td>{student.address}</td>
                            <td>
                                <Link to={`/student/${student.id}/edit`} className="btn btn-primary">Sửa</Link>
                                <button className="btn btn-danger ml-2" onClick={() => handleShow(student)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa học sinh có tên {selectedStudent?.name} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListStudent;