import React, {useState, useEffect} from 'react';
import {getStudentById, updateStudent} from "../service/StudentService";
import {useNavigate, useParams} from 'react-router-dom';
import {getAllClasses} from "../service/ClassService";

const EditStudent = () => {
    const [student, setStudent] = useState({
        id: '',
        name: '',
        age: '',
        address: '',
        classes: {
            classId: '',
            className: ''
        },
        gender: ''
    });

    const [classOptions, setClassOptions] = useState([]);

    const navigate = useNavigate();
    const {id} = useParams();

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

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        if (name === 'classId') {
            const selectedClass = classOptions.find(cls => cls.classId === value);
            setStudent({
                ...student,
                classes: {classId: value, className: selectedClass.className}
            });
        } else {
            setStudent({...student, [name]: value});
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!student.id) {
            return;
        }

        await updateStudent(student);
        navigate('/');
    };

    return (
        <div className="container mt-5" style={{maxWidth: '600px'}}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="text-center mb-4">Chỉnh sửa học sinh</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="name" className="form-label">Tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={student.name}
                                    onChange={handleInputChange}
                                    placeholder="Tên"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="gender" className="form-label">Giới tính</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gender"
                                    name="gender"
                                    value={student.gender}
                                    onChange={handleInputChange}
                                    placeholder="Giới tính"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Tuổi</label>
                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                name="age"
                                value={student.age}
                                onChange={handleInputChange}
                                placeholder="Tuổi"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={student.address}
                                onChange={handleInputChange}
                                placeholder="Địa chỉ"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="classId" className="form-label">Lớp</label>
                            <select
                                className="form-select"
                                id="classId"
                                name="classId"
                                value={student.classes.classId}
                                onChange={handleInputChange}
                            >
                                <option value="">Chọn lớp</option>
                                {classOptions.map(cls => (
                                    <option key={cls.classId} value={cls.classId}>
                                        {cls.className}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Cập nhật học sinh</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;