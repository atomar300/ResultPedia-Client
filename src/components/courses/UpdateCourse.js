import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getCourse, updateCourse } from '../../actions/courseAction';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UPDATE_COURSE_RESET } from '../../constants/courseConstants';
import Loader from '../loader/Loader';
import PageTitle from '../PageTitle';
import "./UpdateCourse.css";



const UpdateCourse = () => {

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseAverage, setCourseAverage] = useState("");

    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isUpdated, course, loading } = useSelector(state => state.course);

    const updateCourseSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("courseName", courseName);
        myForm.append("courseCode", courseCode);
        myForm.append("courseAverage", courseAverage);

        dispatch(updateCourse(id, myForm));
    };


    useEffect(() => {
        if (course){
            setCourseName(course.courseName);
            setCourseCode(course.courseCode);
            setCourseAverage(course.courseAverage);
        }
    },[course])


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Course Updated Successfully!")
            navigate("/courses");
            dispatch({ type: UPDATE_COURSE_RESET })
        }

        dispatch(getCourse(id));

    }, [dispatch, error, isUpdated, navigate, id])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Update Course" />
                    <div className='add-form-container'>
                        <h3>Update Course</h3>
                        <form
                            onSubmit={updateCourseSubmitHandler}
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
                            <button className='course-update-button' type='submit'>Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UpdateCourse;