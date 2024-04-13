import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newResult } from '../../actions/resultAction';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { NEW_RESULT_RESET } from '../../constants/resultConstants';
import Loader from '../loader/Loader';
import { getCourses } from '../../actions/courseAction';
import { getStudents } from '../../actions/studentAction';
import PageTitle from '../PageTitle';
import "./AddResult.css";

const AddResult = () => {

    const [studentFullName, setStudentFullName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [grade, setGrade] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isAdded, loading } = useSelector(state => state.newResult);
    const { students } = useSelector(state => state.students);
    const { courses } = useSelector(state => state.courses);

    const addResultSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("studentId", studentFullName);
        myForm.append("courseId", courseName);
        myForm.append("grade", grade);

        dispatch(newResult(myForm));
    };


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAdded) {
            toast.success("Result Added Successfully!")
            navigate("/results");
            dispatch({ type: NEW_RESULT_RESET })
        }

        dispatch(getStudents());
        dispatch(getCourses());

    }, [dispatch, error, isAdded, navigate])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Add Result" />
                    <div className='add-form-container'>
                        <h3>Add a Result</h3>
                        <form
                            onSubmit={addResultSubmitHandler}
                        >
                            <div className='special-form-group'>
                                <label>
                                    Student Full Name:
                                    <select required value={studentFullName} onChange={(e) => setStudentFullName(e.target.value)}>
                                        <option value="">Select a Student</option>
                                        {students?.map(student => (
                                            <option key={student.id} value={student.id}>{`${student.firstName} ${student.familyName}`}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='special-form-group'>
                                <label>
                                    Course Name:
                                    <select required value={courseName} onChange={(e) => setCourseName(e.target.value)}>
                                        <option value="">Select a Course</option>
                                        {courses?.map(course => (
                                            <option key={course.id} value={course.id}>{`${course.courseName} (${course.courseCode})`}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className='special-form-group'>
                                <label>
                                    Grade:
                                    <select required value={grade} onChange={(e) => setGrade(e.target.value)}>
                                        <option value="">Select a Grade</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </select>
                                </label>
                            </div>
                            <button className='add-button' type='submit'>Add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AddResult;