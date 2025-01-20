import React from "react";

function StudentList() {
    const students = [
        { id: 1, name: "Trương Tấn Hải", point: 9, address: "Quảng Nam" },
        { id: 2, name: "Trương Tấn Hải ", point: 8, address: "Hà Nội" },
        { id: 3, name: "Hoàng Ngọc Hiếu", point: 7, address: "Quảng Trị" },
    ];

    return (
        <div>
            <h1>Danh sách sinh viên</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Điểm</th>
                        <th>Học Lực</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.point}</td>
                            <td>{student.point >= 9? "giỏi" : student.point >= 5? "khá" : "trung bình"}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;

//key