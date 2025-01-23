import React from "react";
import { useParams } from "react-router-dom";
import { detailStudent } from "../service/StudentService";

const DetailStudent = () => {
    const { id } = useParams();
    const [studentDetail, setStudentDetail] = React.useState(null);

    React.useEffect(() => {
        const fetchDetail = async () => {
            if (id) {
                try {
                    const response = await detailStudent(id);
                    setStudentDetail(response);
                } catch (error) {
                    console.error('Error fetching student details:', error);
                }
            }
        };
        fetchDetail();
    }, [id]);

    if (!studentDetail) {
        return <p>Loading student details...</p>;
    }

    return (
        <div>
            <h2>Chi tiết học sinh</h2>
            <table className="table">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{studentDetail.id}</td>
                    </tr>
                    <tr>
                        <td>Họ và tên</td>
                        <td>{studentDetail.name}</td>
                    </tr>
                    <tr>
                        <td>Tuổi</td>
                        <td>{studentDetail.age}</td>
                    </tr>
                    <tr>
                        <td>Giới Tính</td>
                        <td>{studentDetail.gender}</td>
                    </tr>
                    <tr>
                        <td>Lớp</td>
                        <td>{studentDetail.classes?.className || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ</td>
                        <td>{studentDetail.address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DetailStudent;