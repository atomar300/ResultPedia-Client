import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newStudent } from '../../actions/studentAction';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { NEW_STUDENT_RESET } from '../../constants/studentConstants';
import Loader from '../loader/Loader';
import PageTitle from '../PageTitle';
import "./AddStudent.css";


const AddStudent = () => {

    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [studentNumber, setStudentNumber] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAdded, loading } = useSelector(state => state.newStudent);

    const addStudentSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("firstName", firstName);
        myForm.append("familyName", familyName);
        myForm.append("studentNumber", studentNumber);
        myForm.append("birthDate", dateOfBirth);

        dispatch(newStudent(myForm));
    };


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAdded) {
            toast.success("Student Added Successfully!")
            navigate("/students");
            dispatch({ type: NEW_STUDENT_RESET })
        }

    }, [dispatch, error, isAdded, navigate])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Add Student" />
                    <div className='add-form-container'>
                        <h3>Add a Student</h3>
                        <form
                            onSubmit={addStudentSubmitHandler}
                        >
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='firstName'
                                    required
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='familyName'
                                    required
                                    placeholder='Family Name'
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='studentNumber'
                                    required
                                    placeholder='Student Number'
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type="date"
                                    name='dateOfBirth'
                                    required
                                    placeholder='Date of Birth'
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
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
export default AddStudent;