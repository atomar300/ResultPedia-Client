import React, { useEffect } from 'react'
import "./Courses.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loader/Loader';
import toast from 'react-hot-toast';
import { clearErrors, deleteCourse, getCourses } from '../../actions/courseAction';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';


const Courses = () => {

    const dispatch = useDispatch();
    const { loading, courses, error } = useSelector(state => state.courses);

    const handleDeleteCourse = (id) => {
        dispatch(deleteCourse(id));
        toast.success("Course Deleted Successfully!");
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getCourses());
    }, [dispatch, error])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Courses" />
                    <div className='table-container'>
                        <Link className='add-link' to="/course/add">Add Course</Link >
                        {courses && courses.length !== 0 ? (
                            <table>
                                <thead>
                                    <tr id="header">
                                        <th>Course Name</th>
                                        <th>Course Code</th>
                                        <th>Course Average</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses?.map(course => (
                                        <tr key={course.id}>
                                            <td>{course.courseName}</td>
                                            <td>{course.courseCode}</td>
                                            <td>{course.courseAverage === 0 ? "Not Available Yet" : course.courseAverage}</td>
                                            <td>
                                                <div className='course-actions'>
                                                    <div><Link to={`/course/${course.id}`}>Update</Link></div>
                                                    <div onClick={() => handleDeleteCourse(course.id)}>Delete</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                No courses have been added yet. Click the "Add" button to add courses.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Courses