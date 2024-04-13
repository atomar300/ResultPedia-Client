import React, { useEffect, useState } from 'react'
import "./UpdateStudent.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getSingleStudent, updateStudent } from '../../actions/studentAction';
import { toast } from "react-hot-toast";
import Loader from '../loader/Loader';
import PageTitle from '../PageTitle';
import { UPDATE_STUDENT_RESET } from '../../constants/studentConstants';


const UpdateStudent = () => {

    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [studentNumber, setStudentNumber] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { error, loading, student, isUpdated } = useSelector(state => state.student);

    const updateStudentHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("firstName", firstName);
        myForm.append("familyName", familyName);
        myForm.append("studentNumber", studentNumber);
        myForm.append("birthDate", dateOfBirth);

        dispatch(updateStudent(id, myForm));
    };


    useEffect(() => {
        if (student) {
            setFirstName(student.firstName || "");
            setFamilyName(student.familyName || "");
            setStudentNumber(student.studentNumber || "");
            setDateOfBirth(student.birthDate || "");
        }
    }, [student]);
    


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Student Updated Successfully!")
            navigate("/students");
            dispatch({ type: UPDATE_STUDENT_RESET })
        }

        dispatch(getSingleStudent(id));

    }, [dispatch, error, navigate, id, isUpdated])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Update Student" />
                    <div className='add-form-container'>
                        <h3>{`Update Student`}</h3>
                        <form
                            onSubmit={updateStudentHandler}
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
                            <button className='update-add-button' type='submit'>Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateStudent