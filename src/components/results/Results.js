import React, { useEffect } from 'react'
import "./Results.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loader/Loader';
import toast from 'react-hot-toast';
import { clearErrors, deleteResult, getResults } from '../../actions/resultAction';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';

const Results = () => {

    const dispatch = useDispatch();
    const { loading, results, error } = useSelector(state => state.results);

    const deleteResultHander = (id) => {
        dispatch(deleteResult(id));
        toast.success("Result Deleted Successfully!");
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getResults());
    }, [dispatch, error])


    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    <PageTitle title="Results" />
                    <div className='table-container'>
                        <Link className='add-link' to="/result/add">Add Result</Link>
                        {results && results.length !== 0 ? (
                            <table>
                                <thead>
                                    <tr id="header">
                                        <th>Student Full Name</th>
                                        <th>Course Name</th>
                                        <th>Grade</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results?.map(result => (
                                        <tr key={result.id}>
                                            <td>{`${result.student.firstName} ${result.student.familyName}`}</td>
                                            <td>{result.course.courseName}</td>
                                            <td>{result.grade}</td>
                                            <td>
                                                <div className='result-action'>
                                                    <div><Link to={`/result/${result.id}`}>Update</Link></div>
                                                    <div onClick={() => deleteResultHander(result.id)}>Delete</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                No results have been added yet. Click the "Add" button to add results.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Results