import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getResult, updateResult } from '../../actions/resultAction';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UPDATE_RESULT_RESET } from '../../constants/resultConstants';
import Loader from '../loader/Loader';
import PageTitle from '../PageTitle';
import "./UpdateResult.css";

const UpdateResult = () => {

    const { id } = useParams();

    const [studentFullName, setStudentFullName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [grade, setGrade] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading, result } = useSelector(state => state.result);


    useEffect(() => {
        if (result && result.student && result.course) {
            setGrade(result.grade);
            setStudentFullName(`${result.student.firstName} ${result.student.familyName}`);
            setCourseName(`${result.course.courseName} (${result.course.courseCode})`)
        }
    }, [result])


    const updateResultSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("id", id)
        myForm.append("studentId", result.student.id);
        myForm.append("courseId", result.course.id);
        myForm.append("grade", grade);

        dispatch(updateResult(myForm));
    };


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Result Updated Successfully!")
            navigate("/results");
            dispatch({ type: UPDATE_RESULT_RESET })
        }

        dispatch(getResult(id));

    }, [dispatch, error, isUpdated, navigate, id])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Update Result" />
                    <div className='add-form-container'>
                        <h3>Update Result</h3>
                        <form
                            onSubmit={updateResultSubmitHandler}
                        >
                            <div className='special-form-group'>
                                <label>
                                    Student Full Name:
                                    <select>
                                        <option>{studentFullName}</option>
                                    </select>
                                </label>
                            </div>
                            <div className='special-form-group'>
                                <label>
                                    Course Name:
                                    <select>
                                        <option>{courseName}</option>
                                    </select>
                                </label>
                            </div>
                            <div className='special-form-group'>
                                <label>
                                    Grade:
                                    <select required value={grade} onChange={(e) => setGrade(e.target.value)}>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </select>
                                </label>
                            </div>
                            <button className='result-update-button' type='submit'>Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UpdateResult;