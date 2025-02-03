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

        useEffect(() => {
            fetchClasses();
            fetchStudents();
        }, []);

        const fetchStudents = async () => {
            const response = await getAllStudents();
            const sortedStudents = response.sort((a, b) => {
                const lastNameA = a.name.split(' ').pop().toLowerCase();
                const lastNameB = b.name.split(' ').pop().toLowerCase();
                return lastNameA.localeCompare(lastNameB);
            });
            setStudents(sortedStudents);
        };

        const fetchClasses = async () => {
            const response = await getAllClasses();
            setClasses(Array.isArray(response) ? response : []);
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
            const lowerCaseQuery = nameQuery.toLowerCase();

            const response = await searchStudent(lowerCaseQuery, selectedClass);
            console.log('Kết quả tìm kiếm:', response);
            setStudents(response);
        };


        const searchStudent = async (nameQuery, selectedClass) => {
            let students = await getAllStudents();
            students = students.filter(student =>
                student.name.toLowerCase().includes(nameQuery)
            );
            if (selectedClass) {
                students = students.filter(student =>
                    student.classes?.className.toLowerCase() === selectedClass.toLowerCase()
                );
            }

            return students;
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
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
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