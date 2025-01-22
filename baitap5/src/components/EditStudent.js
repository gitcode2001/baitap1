import React, { useState, useEffect } from 'react';
import { getStudentById, updateStudent } from "../service/StudentService";
import { useNavigate, useParams } from 'react-router-dom';
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
    const { id } = useParams();

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
        const { name, value } = event.target;
        if (name === 'classId') {
            const selectedClass = classOptions.find(cls => cls.classId === value);
            setStudent({
                ...student,
                classes: { classId: value, className: selectedClass.className }
            });
        } else {
            setStudent({ ...student, [name]: value });
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
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                />
                <input
                    type="text"
                    name="address"
                    value={student.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                />
                <select
                    name="classId"
                    value={student.classes.classId}
                    onChange={handleInputChange}
                >
                    <option value="">Select Class</option>
                    {classOptions.map(cls => (
                        <option key={cls.classId} value={cls.classId}>
                            {cls.className}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="gender"
                    value={student.gender}
                    onChange={handleInputChange}
                    placeholder="Gender"
                />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
}

export default EditStudent;