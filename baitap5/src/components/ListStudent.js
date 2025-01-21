import React, { useState, useEffect } from 'react';
import { getAllStudents } from "../service/StudentService";

function ListStudent() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await getAllStudents();
        setStudents(response);
    };

    return (
        <div>
            <h1>Danh sách học sinh</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Tuổi</th>
                        <th>Lớp</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.classes.nameClass}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListStudent;