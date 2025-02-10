import React, { useState, useEffect } from 'react';
import { deleteStudent, getAllStudents, searchStudent } from "../service/StudentService";
import { getAllClasses } from "../service/ClassService";

import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function ListStudent() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [nameQuery, setNameQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    useEffect(() => {
        fetchClasses();
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await getAllStudents();
            const sortedStudents = response.sort((a, b) => {
                const lastNameA = a.name.split(' ').pop().toLowerCase();
                const lastNameB = b.name.split(' ').pop().toLowerCase();
                return lastNameA.localeCompare(lastNameB);
            });
            setStudents(sortedStudents);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Có lỗi xảy ra khi lấy danh sách học sinh');
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await getAllClasses();
            setClasses(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error fetching classes:', error);
            toast.error('Có lỗi xảy ra khi lấy danh sách lớp');
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
            toast.error('Có lỗi xảy ra khi xóa học sinh');
        }
    };

    const handleNameSearchChange = (event) => {
        setNameQuery(event.target.value);
    };

    const handleClassSelectChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const lowerCaseQuery = nameQuery.toLowerCase();
            const response = await searchStudent(lowerCaseQuery, selectedClass);
            console.log('Kết quả tìm kiếm:', response);
            setStudents(response);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error searching students:', error);
            toast.error('Có lỗi xảy ra khi tìm kiếm học sinh');
        }
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(students.length / studentsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1>Danh sách học sinh</h1>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên"
                value={nameQuery}
                onChange={handleNameSearchChange}
                className="form-control mb-3"
            />
            <select
                value={selectedClass}
                onChange={handleClassSelectChange}
                className="form-control mb-3"
            >
                <option value="">Tất cả các lớp</option>
                {classes.map((cls, index) => (
                    <option key={`${cls.classID}-${index}`} value={cls.className}>
                        {cls.className}
                    </option>
                ))}
            </select>
            <button className="btn btn-primary mb-3" onClick={handleSearch}>Tìm kiếm</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Lớp</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student, index) => (
                        <tr key={student.id}>
                            <td>{indexOfFirstStudent + index + 1}</td>
                            <td>
                                <Link to={`/student/${student.id}/view`} className="no-underline">
                                    {student.name}
                                </Link>
                            </td>
                            <td>{student.classes?.className || 'N/A'}</td>
                            <td>
                                <Link to={`/student/${student.id}/edit`} className="btn btn-primary">Sửa</Link>
                                <button className="btn btn-danger ml-2" onClick={() => handleShow(student)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${currentPage === index + 1 ? 'btn-secondary' : 'btn-light'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
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