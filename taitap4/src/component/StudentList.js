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

// Key là một thuộc tính duy nhất được gán cho mỗi phần tử trong một danh sách khi React render một danh sách các phần tử.
// Nó được sử dụng để xác định các phần tử một cách duy nhất.
//Tại sao phải có key trong vòng lặp ?
// React sử dụng key để tối ưu hóa quá trình render danh sách. Khi danh sách được cập nhật (thêm, sửa, xóa),
// React dựa vào key để: Xác định phần tử nào cần thay đổi.
// Tránh render lại toàn bộ danh sách từ đầu.
// Nếu không có key, React sẽ không biết cách xử lý các phần tử nào thay đổi,
// dẫn đến hiệu suất kém và có thể gây ra lỗi logic.
