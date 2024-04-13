import React, { useEffect, useState } from 'react'
import "./Students.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getStudents, deleteStudent } from '../../actions/studentAction';
import Loader from '../loader/Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';


const Students = () => {

    const dispatch = useDispatch();
    const { loading, students, error } = useSelector(state => state.students);

    const [search, setSearch] = useState('');
    const [newStudents, setNewStudents] = useState([]);

    const searchHandler = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filteredStudent = students.filter(s =>
            s.firstName.match(new RegExp(value, "gi")) || s.familyName.match(new RegExp(value, "gi"))
        );
        setNewStudents(filteredStudent);
    }

    useEffect(() => {
        if (students) {
            setNewStudents(students);
        }
    }, [students])


    const deleteStudentHandler = (id) => {
        dispatch(deleteStudent(id));
        toast.success("Student Deleted Successfully!");
    }


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getStudents());
    }, [dispatch, error])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Students" />
                    <div className='table-container'>
                        <Link className='add-link' to="/student/add">Add Student</Link>

                        <div>
                            Name filter:
                            <input
                                type="text"
                                placeholder='search...'
                                value={search}
                                onChange={e => searchHandler(e)}
                            />
                            {
                                newStudents?.map(s => (
                                    <div key={s.id}>{s.firstName}</div>
                                ))
                            }
                        </div>

                        {students && students.length !== 0 ? (
                            <table>
                                <thead>
                                    <tr id="header">
                                        <th>First name</th>
                                        <th>Family name</th>
                                        <th>Student Number</th>
                                        <th>Date of Birth</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students?.map(student => (
                                        <tr key={student.id}>
                                            <td>{student.firstName}</td>
                                            <td>{student.familyName}</td>
                                            <td>{student.studentNumber}</td>
                                            <td>{student.birthDate}</td>
                                            <td>
                                                <div className='students-action'>
                                                    <div><Link to={`/student/${student.id}`}>Update</Link></div>
                                                    <div onClick={() => deleteStudentHandler(student.id)}>Delete</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                No students have been added yet. Click the "Add" button to add students.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Students