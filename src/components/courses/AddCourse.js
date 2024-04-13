import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newCourse } from '../../actions/courseAction';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { NEW_COURSE_RESET } from '../../constants/courseConstants';
import Loader from '../loader/Loader';
import PageTitle from '../PageTitle';
import "./AddCourse.css";

const AddCourse = () => {

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAdded, loading } = useSelector(state => state.newCourse);

    const addCourseSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("courseName", courseName);
        myForm.append("courseCode", courseCode);

        dispatch(newCourse(myForm));
    };


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAdded) {
            toast.success("Course Added Successfully!")
            navigate("/courses");
            dispatch({ type: NEW_COURSE_RESET })
        }

    }, [dispatch, error, isAdded, navigate])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Add Course" />
                    <div className='add-form-container'>
                        <h3>Add a Course</h3>
                        <form
                            onSubmit={addCourseSubmitHandler}
                        >
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='courseName'
                                    required
                                    placeholder='Course Name'
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='courseCode'
                                    required
                                    placeholder='Course Code'
                                    value={courseCode}
                                    onChange={(e) => setCourseCode(e.target.value)}
                                />
                            </div>
                            <button className='add-button' type='submit'>Add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AddCourse;